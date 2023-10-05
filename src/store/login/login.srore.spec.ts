import { AppInitialState } from '../AppIntialState';
import { LoginReducer } from './loagin.reducers';
import {
  RecoveredPassword,
  RecoveredPassworedFailure,
  RecoveredPassworedSuccess,
  login,
  loginFailure,
  loginSuccess,
} from './login.action';
import { LoginState } from './loginState';
import { User } from 'src/app/core/models/user';

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

  it('login', () => {
    const intialState: LoginState = AppInitialState.login;
    const newState = LoginReducer(intialState, login());
    expect(newState).toEqual({
      ...intialState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    });
  });

  it('login sucess', () => {
    let user: any = {};

    const intialState: LoginState = {
      ...AppInitialState.login,
      isLoggingIn: true,
    };
    user.id = 'id';
    const newState = LoginReducer(intialState, loginSuccess({ user }));
    expect(newState).toEqual({
      ...intialState,
      error: null,
      isLoggedIn: true,
      isLoggingIn: false,
    });
  });

  it('login faild ', () => {
    const intialState: LoginState = AppInitialState.login;

    const error = { errror: 'error faild' };
    const newState = LoginReducer(intialState, loginFailure({ error }));

    expect(newState).toEqual({
      ...intialState,
      error,
      isLoggedIn: false,
      isLoggingIn: false,
    });
  });
});
