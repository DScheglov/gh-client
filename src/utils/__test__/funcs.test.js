import {
  isFunc, ensureFunc, isArrayOfFunc, pipe, createPipe, curry,
  idX, compose
} from '../funcs';

describe('isFunc()', () => {
  test('should return true for () => {})', () => {
    expect(isFunc(() => {})).toBeTruthy();
  });

  test('should return true for isFunc', () => {
    expect(isFunc(isFunc)).toBeTruthy();
  });

  test('should return false for 2', () => {
    expect(isFunc(2)).toBeFalsy();
  });

  test('should return false for 0', () => {
    expect(isFunc(2)).toBeFalsy();
  });

  test('should return false for "abc"', () => {
    expect(isFunc('abc')).toBeFalsy();
  });

  test('should return false for empty string', () => {
    expect(isFunc('')).toBeFalsy();
  });

  test('should return false for {}', () => {
    expect(isFunc({})).toBeFalsy();
  });

  test('should return true for []', () => {
    expect(isFunc([])).toBeFalsy();
  });

  test('should return true for new Date()', () => {
    expect(isFunc(new Date())).toBeFalsy();
  });

  test('should return true for true', () => {
    expect(isFunc(true)).toBeFalsy();
  });

  test('should return true for false', () => {
    expect(isFunc(false)).toBeFalsy();
  });
});

describe('ensureFunc()', () => {
  test('should return first argument if it is function', () => {
    const NOOP = () => {};
    expect(
      ensureFunc(NOOP, isFunc)
    ).toBe(NOOP);
  });

  test('should return second argument if the first is not a function', () => {
    const NOOP = () => {};
    expect(
      ensureFunc(0, NOOP)
    ).toBe(NOOP);
  });
});

describe('isArrayOfFunc()', () => {
  test('should return false for not an array', () => {
    expect(
      isArrayOfFunc(123)
    ).toBeFalsy();
  });

  test('should return false for array of numbers', () => {
    expect(
      isArrayOfFunc([1, 2, 3])
    ).toBeFalsy();
  });

  test('should return false for array of strings', () => {
    expect(
      isArrayOfFunc(['a', 'b', 'c'])
    ).toBeFalsy();
  });

  test('should return true for array of functions', () => {
    expect(
      isArrayOfFunc([isFunc, ensureFunc, isArrayOfFunc])
    ).toBeTruthy();
  });
});

describe('pipe', () => {
  test('should pipe a value through the functions', () => {
    const up = jest.fn(str => str.toUpperCase());
    const addScreamer = jest.fn(str => `${str}!`);

    expect(
      pipe('Hello World', up, addScreamer)
    ).toBe('HELLO WORLD!');
    expect(up.mock.calls).toEqual([['Hello World']]);
    expect(addScreamer.mock.calls).toEqual([['HELLO WORLD']]);
  });
});

describe('createPipe', () => {
  test('should create a Function', () => {
    const up = str => str.toUpperCase();
    const addScreamer = str => `${str}!`;

    expect(
      createPipe(up, addScreamer)
    ).toBeInstanceOf(Function);
  });

  test('should create a function that pipes a value', () => {
    const up = jest.fn(str => str.toUpperCase());
    const addScreamer = jest.fn(str => `${str}!`);

    const pipingFunc = createPipe(up, addScreamer);
    expect(
      pipingFunc('Hello World')
    ).toBe('HELLO WORLD!');
    expect(up.mock.calls).toEqual([['Hello World']]);
    expect(addScreamer.mock.calls).toEqual([['HELLO WORLD']]);
  });
});

describe('curry', () => {
  test('should create a Function', () => {
    expect(curry(Math.pow)).toBeInstanceOf(Function);
  });

  test('should create a curriable function with default ariaty', () => {
    const pow = curry(Math.pow);
    const powOf2 = pow(2);
    expect(pow).toBeInstanceOf(Function);
    expect(powOf2).toBeInstanceOf(Function);
    expect(powOf2(3)).toBe(8);
    expect(pow(2, 3)).toBe(8);
  });

  test('should create a curriable function with specified arity', () => {
    const max = curry(Math.max, 4);
    expect(max).toBeInstanceOf(Function);
    expect(max(1)).toBeInstanceOf(Function);
    expect(max(1)(2)).toBeInstanceOf(Function);
    expect(max(1, 2)).toBeInstanceOf(Function);
    expect(max(1)(2)(3)).toBeInstanceOf(Function);
    expect(max(1, 2, 3)).toBeInstanceOf(Function);
    expect(max(1)(2)(3)(4)).toBe(4);
    expect(max(1, 2, 3, 4)).toBe(4);
  });
});

describe('idX', () => {
  test('should return the same object', () => {
    const obj = {};
    expect(idX(obj)).toBe(obj);
  });

  test('should not modify the argument', () => {
    const obj = Object.freeze({});
    expect(idX(obj)).toBe(obj);
  });
});

describe('compose', () => {
  test('should return an idX function if no args passed', () => {
    expect(compose()).toBe(idX);
  });

  test('should compose functions', () => {
    const up = jest.fn(str => str.toUpperCase());
    const addScreamer = jest.fn(str => `${str}!`);
    const addQuestion = jest.fn(str => `${str}?`);

    const composedFunc = compose(addScreamer, addQuestion, up);
    expect(
      composedFunc('Hello World')
    ).toBe('HELLO WORLD?!');
    expect(up.mock.calls).toEqual([['Hello World']]);
    expect(addQuestion.mock.calls).toEqual([['HELLO WORLD']]);
    expect(addScreamer.mock.calls).toEqual([['HELLO WORLD?']]);
  });
});
