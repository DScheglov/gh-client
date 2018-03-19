import { actionCreator } from '../utils/actions';
import { createReducer } from '../utils/reducers';
import { createSelector, domainSelector } from '../utils/selectors';
import { include, exclude } from '../utils/helpers';
import { REDUX_PREFIX } from '../config';

export const start = actionCreator(`${REDUX_PREFIX}::LOADING::START`);
export const end = actionCreator(`${REDUX_PREFIX}::LOADING::END`);

const loading = createReducer([], {
  [start.type]: (state, { payload }) => include(state, payload),
  [end.type]: (state, { payload }) => exclude(state, payload),
});

export default { loading };

export const domain = domainSelector(_ => _.loading);

export const isLoading = createSelector(
  domain, tasks => tasks.length > 0
);

export const isTaskLoading = createSelector(
  domain, (_, task) => task,
  (tasks, task) => tasks.includes(task)
);
