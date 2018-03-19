import { isFunc } from './funcs';

const call = (reducer, state, action) => (
  isFunc(reducer) ? reducer(state, action) : state
);

export const subscription = (actionTypes, reducer) => (
  actionTypes.reduce((map, type) => Object.assign(map, { [type]: reducer }), {})
);

export const createReducer = (initialState, reducerMap) => (
  (state = initialState, action) => call(reducerMap[action.type], state, action)
);

export const mergePayload = (state, { payload }) => ({ ...state, ...payload });

const defIdSelector = ({ payload }) => payload.id;

export const lookupReducer = (entity, idSelector = defIdSelector) => (
  (state, action, id = idSelector(action)) => ({
    ...state, [id]: entity(state[id], action)
  })
);

export const batchCreate = type => Object.assign(
  actions => ({ type, actions }), { type }
);

const dispatchAll = (actions, reducer, state) => (
  actions.length > 0 ? actions.reduce(reducer, state) : state
);

export const batchingReducer = (type, reducer) => (state, action) => (
  action.type === type
    ? dispatchAll(action.actions, reducer, state)
    : reducer(state, action)
);
