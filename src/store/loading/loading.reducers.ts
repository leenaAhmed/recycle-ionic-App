import { Action, createReducer, on } from '@ngrx/store';
import { Show, Hide } from './loading.action';
import { TypedAction } from '@ngrx/store/src/models';
import { LoadingState } from './loadingState';

const initialState: LoadingState = {
  show: false,
};
const reducer = createReducer(
  initialState,
  on(Show, () => {
    return { show: true };
  }),
  on(Hide, () => {
    return { show: false };
  })
);

export function loadingReducer(
  state: LoadingState,
  action: Action | TypedAction<'[loading] show'>
) {
  return reducer(state, action);
}
