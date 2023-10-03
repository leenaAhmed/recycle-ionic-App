import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
      ],
      declarations: [LoginPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
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
});
