import { createAction, props } from '@ngrx/store';

export const RecoveredPassword = createAction('[Recover password]');

export const RecoveredPassworedSuccess = createAction(
  '[Recover password] Success'
);

export const RecoveredPassworedFailure = createAction(
  '[Recover password] Failure',
  props<{ error: any }>()
);
