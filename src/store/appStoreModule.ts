import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducers';
import { LoginReducer } from './login/loagin.reducers';

export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', LoginReducer),
];
