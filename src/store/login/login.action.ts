import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user';

export const RecoveredPassword = createAction('[Recover password]');

export const RecoveredPassworedSuccess = createAction(
  '[Recover password] Success'
);

export const RecoveredPassworedFailure = createAction(
  '[Recover password] Failure',
  props<{ error: any }>()
);

export const login = createAction('[Login]');

export const loginSuccess = createAction(
  '[Login] Success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Login] Failure',
  props<{ error: any }>()
);
