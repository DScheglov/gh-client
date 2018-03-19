import { actionCreator } from '../utils/actions';
import { createReducer } from '../utils/reducers';
import { domainSelector } from '../utils/selectors';
import { REDUX_PREFIX } from '../config';

export const set = actionCreator(`${REDUX_PREFIX}::ERROR::SET`);
export const reset = actionCreator(`${REDUX_PREFIX}::ERROR::RESET`);

const errors = createReducer(null, {
  [set.type]: (_, action) => action.payload,
  [reset.type]: () => null,
});

export default { errors };

export const domain = domainSelector(state => state.errors || {});

export const getError = domain;
