import { actionCreator } from '../utils/actions';
import { createReducer } from '../utils/reducers';
import { domainSelector } from '../utils/selectors';
import { REDUX_PREFIX } from '../config';

export const update = actionCreator(`${REDUX_PREFIX}::USER-NAME::UPDATE`);

const userName = createReducer('', {
  [update.type]: (_, action) => action.payload,
});

export default { userName };

export const domain = domainSelector(state => state.userName);

export const getUserName = domain;
