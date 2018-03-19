import deepFreeze from 'deep-freeze';
import {
  createReducer, subscription, mergePayload, lookupReducer,
  batchCreate, batchingReducer
} from '../reducers';

describe('createReducer', () => {
  const initialState = { key: 'initial state ' };
  let reducer = null;

  beforeAll(() => {
    reducer = createReducer(initialState, {
      ASSIGN: (state, action) => ({ ...state, ...action.payload }),
      REVERSE: state => (
        { ...state, key: state.key.split('').reverse().join('') }
      )
    });
  });

  test('shout create an function', () => {
    expect(typeof reducer).toBe('function');
  });

  test('created reducer should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('created reducer should process all actions', () => {
    let state;
    let action = { type: 'ASSIGN', payload: { key: 'New value' } };

    deepFreeze(action);
    state = reducer(state, action);
    expect(state).toEqual({ key: 'New value' });

    action = { type: 'REVERSE' };
    [state, action].forEach(deepFreeze);
    state = reducer(state, action);
    expect(state).toEqual({ key: 'eulav weN' });

    action = { type: 'REVERSE' };
    [state, action].forEach(deepFreeze);
    state = reducer(state, action);
    expect(state).toEqual({ key: 'New value' });

    action = { type: 'UNKNOWN' };
    [state, action].forEach(deepFreeze);
    state = reducer(state, action);
    expect(state).toEqual({ key: 'New value' });
  });
});

describe('subscribtion', () => {
  let reducer;
  const initialState = 'initial state';
  const newState = 'Common handler called';
  const anotherNewState = 'Anothe New State';

  beforeAll(() => {
    reducer = createReducer(initialState, Object.assign(
      subscription(['ASSIGN', 'REVERSE'], () => newState),
      subscription(['ANOTHER'], () => anotherNewState),
      subscription([null], () => `${newState} :: ${anotherNewState}`)
    ));
  });

  test('shout create an function', () => {
    expect(typeof reducer).toBe('function');
  });

  test('created reducer should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('created reducer should process all actions', () => {
    let state;
    let action = { type: 'ASSIGN', payload: { key: 'New value' } };

    deepFreeze(action);
    state = reducer(state, action);
    expect(state).toEqual(newState);

    action = { type: 'REVERSE' };
    [state, action].forEach(deepFreeze);
    state = reducer(undefined, action);
    expect(state).toEqual(newState);

    action = { type: 'REVERSE' };
    [state, action].forEach(deepFreeze);
    state = reducer(undefined, action);
    expect(state).toEqual(newState);

    action = { type: 'ANOTHER' };
    [state, action].forEach(deepFreeze);
    state = reducer(undefined, action);
    expect(state).toEqual(anotherNewState);

    action = { type: 'UNKNOWN' };
    [state, action].forEach(deepFreeze);
    state = reducer('some state', action);
    expect(state).toEqual('some state');
  });
});

describe('mergePayload', () => {
  test('should update a state', () => {
    let state = {};
    const action = { payload: { x: 1 } };

    [state, action].forEach(deepFreeze);
    state = mergePayload(state, action);
    expect(state).toEqual(action.payload);
    expect(state).not.toBe(action.payload);
  });
});

describe('lookupReducer', () => {
  test('should register the subenitity', () => {
    const handler = lookupReducer(mergePayload, undefined);
    expect(typeof handler).toBe('function');

    let state = {};
    const action = { payload: { id: 1, value: 42 } };

    [state, action].forEach(deepFreeze);
    state = handler(state, action);
    expect(state).toEqual({ 1: action.payload });
    expect(state[1]).not.toBe(action.payload);
  });


  test('should register the subenitity with custom idSelector', () => {
    const handler = lookupReducer(
      mergePayload, action => action.id
    );
    expect(typeof handler).toBe('function');

    let state = {};
    const action = { id: 1, payload: { value: 42 } };

    [state, action].forEach(deepFreeze);
    state = handler(state, action);
    expect(state).toEqual({ 1: action.payload });
    expect(state[1]).not.toBe(action.payload);
  });
});

const allActions = (state = [], action) => (
  /SN-FRNT-BATCH::INIT/.test(action.type) ? state : [...state, action]
);

describe('Reducers.batching.batch', () => {
  it('should create an actions batcher', () => {
    const batch = batchCreate('MY::BATCH');
    expect(batch).toBeInstanceOf(Function);
    expect(batch.type).toBe('MY::BATCH');
  });

  it('should create a function that batches the actions', () => {
    const batch = batchCreate('MY::BATCH');
    const batchOfActions = batch([
      { type: 'Type1' },
      { type: 'Type2' }
    ]);

    expect(batchOfActions).toEqual({
      type: 'MY::BATCH',
      actions: [
        { type: 'Type1' },
        { type: 'Type2' }
      ]
    });
  });
});

describe('Reducers.batching.batchingReducer', () => {
  it('should decorate a reducer', () => {
    const batch = batchCreate('MY::BATCH');
    const reducer = batchingReducer(batch.type, allActions);
    expect(reducer).toBeInstanceOf(Function);
  });

  it('should return reducer that dispatches actions as usual', () => {
    const batch = batchCreate('MY::BATCH');
    const reducer = batchingReducer(batch.type, allActions);
    let state = deepFreeze(reducer(undefined, deepFreeze({ type: '@@INIT' })));
    state = deepFreeze(reducer(state, deepFreeze({ type: 'Type1' })));
    expect(state).toEqual([
      { type: '@@INIT' },
      { type: 'Type1' }
    ]);
  });

  it('should return reducer that dispatches actions as batch', () => {
    const batch = batchCreate('MY::BATCH');
    const reducer = batchingReducer(batch.type, allActions);
    let state = deepFreeze(reducer(undefined, deepFreeze({ type: '@@INIT' })));
    const action = deepFreeze(batch([
      { type: 'Type1' },
      { type: 'Type2', payload: 3 }
    ]));
    state = deepFreeze(reducer(state, action));
    expect(state).toEqual([
      { type: '@@INIT' },
      { type: 'Type1' },
      { type: 'Type2', payload: 3 }
    ]);
  });

  it('should return reducer that dispatches empty batch on undefined state', () => {
    const batch = batchCreate('MY::BATCH');
    const reducer = batchingReducer(batch.type, allActions);
    const action = deepFreeze(batch([]));
    const state = reducer(undefined, action);
    expect(state).toBeUndefined();
  });
});
