import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { AppState } from 'src/store/appState';
import { LoginReducer } from 'src/store/login/loagin.reducers';
import {
  RecoveredPassword,
  RecoveredPassworedFailure,
  RecoveredPassworedSuccess,
} from 'src/store/login/login.action';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>;
  let toast: ToastController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', LoginReducer),
      ],
      declarations: [LoginPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    toast = TestBed.get(ToastController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home page on  login btn', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.login();
    tick(2500);

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  }));

  it('should go to sing up page on register botton', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['sign-up']);
  });

  let form: FormGroup;
  beforeEach(() => {
    form = component.createForm();
  });

  it('should create login  form empty', () => {
    expect(form).not.toBeNull();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('email')?.value).toEqual('');
    expect(form.get('email')?.valid).toBeFalsy();

    expect(form.get('password')).not.toBeNull();
    expect(form.get('password')?.value).toEqual('');
    expect(form.get('password')?.valid).toBeFalsy();
  });

  it('should have email invaild if  email is not valid', () => {
    form.get('email')?.setValue('invalid email');
    expect(form.get('email')?.valid).toBeFalsy();
  });

  it('should have email valid if  email is  valid', () => {
    form.get('email')?.setValue('vaild@gmail.com');
    expect(form.get('email')?.valid).toBeTruthy();
  });

  it('should have valid form', () => {
    form.get('email')?.setValue('vaild@gmail.com');
    form.get('password')?.setValue('anyPassword');

    expect(form.valid).toBeTruthy();
  });

  it('should recover email/password on forget email/password', () => {
    //  start page
    fixture.detectChanges();
    // user set valid password
    component.form.get('email')?.setValue('vaild@gmail.com');
    // user click on password
    page.querySelector('#recoverPasswordBtn').click();
    // expect login.recoveremail is true
    store.select('login').subscribe((loginstate) => {
      expect(loginstate.isRecoveringPassword).toBeTruthy();
    });
  });

  it('should show loading when recovering email', () => {
    fixture.detectChanges();
    // component.ngOnInit();
    // change recovering to be true
    store.dispatch(RecoveredPassword());
    // verify loading
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeTruthy();
    });
  });

  it('should hide  loading and show sucess message ', () => {
    spyOn(toast, 'create');
    fixture.detectChanges();
    store.dispatch(RecoveredPassword());
    store.dispatch(RecoveredPassworedSuccess());

    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy();
    });
    expect(toast.create).toHaveBeenCalledTimes(1);
  });

  it('should hide  loading and show sucess message when error on recover message ', () => {
    spyOn(toast, 'create');

    fixture.detectChanges();
    store.dispatch(RecoveredPassword());
    store.dispatch(
      RecoveredPassworedFailure({ error: 'error email not found' })
    );
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy();
    });
    expect(toast.create).toHaveBeenCalledTimes(1);
  });
});
