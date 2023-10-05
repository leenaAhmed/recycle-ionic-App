import { Action, createReducer, on } from '@ngrx/store';
import { LoginState } from './loginState';
import {
  RecoveredPassword,
  RecoveredPassworedFailure,
  RecoveredPassworedSuccess,
  login,
  loginFailure,
  loginSuccess,
} from './login.action';

const intialState: LoginState = {
  error: null,
  isRecoveredPassword: false,
  isRecoveringPassword: false,
  isLoggedIn: false,
  isLoggingIn: false,
};

const reducer = createReducer(
  intialState,
  on(RecoveredPassword, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),
  on(RecoveredPassworedSuccess, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),
  on(RecoveredPassworedFailure, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    };
  }),
  on(login, (currentState, action) => {
    return {
      ...currentState,
      isLoggedIn: false,
      isLoggingIn: true,
      error: null,
    };
  }),
  on(loginSuccess, (currentState, action) => {
    return {
      ...currentState,
      isLoggedIn: true,
      isLoggingIn: false,
    };
  }),
  on(loginFailure, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false,
    };
  })
);

export function LoginReducer(stae: LoginState, action: Action) {
  return reducer(stae, action);
}
