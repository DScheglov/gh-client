import { actionCreator } from '../actions';

describe('actionCreator', () => {
  test('should return a function', () => {
    expect(actionCreator('SOME_ACTION')).toBeInstanceOf(Function);
  });

  test('should contain a type', () => {
    expect(actionCreator('TYPE').type).toEqual('TYPE');
  });

  test('should return a function that creates an action', () => {
    const action = actionCreator('TYPE');
    expect(action()).toEqual({ type: 'TYPE' });
  });

  test('should return a function that creates an action', () => {
    const action = actionCreator('TYPE');
    expect(action(100)).toEqual({ type: 'TYPE', payload: 100 });
  });

  test('should return an actionCreator with custom payload', () => {
    const action = actionCreator('TYPE', amount => ({ amount }));
    expect(action(100)).toEqual({ type: 'TYPE', amount: 100 });
  });
});
