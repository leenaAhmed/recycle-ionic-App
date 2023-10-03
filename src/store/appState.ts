import { LoadingState } from './loading/loadingState';
import { LoginState } from './login/loginState';

export interface AppState {
  loading: LoadingState;
  login: LoginState;
}
