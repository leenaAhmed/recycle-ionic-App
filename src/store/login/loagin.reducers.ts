import { Action, createReducer, on } from '@ngrx/store';
import { LoginState } from './loginState';
import {
  RecoveredPassword,
  RecoveredPassworedFailure,
  RecoveredPassworedSuccess,
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
  })
);

export function LoginReducer(stae: LoginState, action: Action) {
  return reducer(stae, action);
}
