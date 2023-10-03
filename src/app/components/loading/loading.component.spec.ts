import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadingComponent } from './loading.component';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { AppState } from 'src/store/appState';
import { Hide, Show } from 'src/store/loading/loading.action';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should hide loading component when its not loaded', () => {
    const compiled = fixture.nativeElement;
    store.dispatch(Hide());
    fixture.detectChanges();
    expect(compiled.querySelector('.backdrop')).toBeNull();
  });

  it('should show loading component when its  loaded', () => {
    const compiled = fixture.nativeElement;
    store.dispatch(Show());
    fixture.detectChanges();
    expect(compiled.querySelector('.backdrop')).not.toBeNull();
  });
});
