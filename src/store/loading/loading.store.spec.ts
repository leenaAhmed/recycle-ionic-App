import { loadingReducer } from './loading.reducers';
import { LoadingState } from './loadingState';
import { Show, Hide } from './loading.action';
import { createAction } from '@ngrx/store';

describe('loading store', () => {
  it('show', () => {
    const intialState: LoadingState = { show: false };
    const newState = loadingReducer(intialState, Show());
    expect(newState).toEqual({ show: true });
  });

  it('hide', () => {
    const intialState: LoadingState = { show: true };
    const newState = loadingReducer(intialState, Hide());
    expect(newState).toEqual({ show: false });
  });

  it('should keep state if action is unknown', () => {
    const intialState: LoadingState = { show: true };
    const action = createAction('UNKNOWN');
    const newState = loadingReducer(intialState, action);
    expect(newState).toEqual({ show: true });
  });
});
