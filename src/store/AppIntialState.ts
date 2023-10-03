import { AppState } from './appState';

export const AppInitialState: AppState = {
  loading: {
    show: false,
  },
  login: {
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
    isLoggedIn: false,
    isLoggingIn: false,
  },
};
