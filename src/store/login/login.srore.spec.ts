import { AppInitialState } from '../AppIntialState';
import { LoginReducer } from './loagin.reducers';
import {
  RecoveredPassword,
  RecoveredPassworedFailure,
  RecoveredPassworedSuccess,
} from './login.action';
import { LoginState } from './loginState';

describe('login store', () => {
  it('RecoveredPassword', () => {
    const intialState: LoginState = AppInitialState.login;
    const newState = LoginReducer(intialState, RecoveredPassword());

    expect(newState).toEqual({
      ...intialState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    });
  });

  it('RecoveredPassworedSuccess', () => {
    const intialState: LoginState = AppInitialState.login;
    const newState = LoginReducer(intialState, RecoveredPassworedSuccess());

    expect(newState).toEqual({
      ...intialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    });
  });

  it('RecoveredPassworedFailure', () => {
    const intialState: LoginState = AppInitialState.login;

    const error = { errror: 'error' };
    const newState = LoginReducer(
      intialState,
      RecoveredPassworedFailure({ error })
    );

    expect(newState).toEqual({
      ...intialState,
      error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    });
  });
});
