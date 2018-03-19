export const isFunc = func => typeof func === 'function';
export const ensureFunc = (func, defFunc) => isFunc(func) && func || defFunc;
export const isArrayOfFunc = funcs => (
  Array.isArray(funcs) && funcs.every(isFunc)
);
export const pipe = (value, ...funcs) => funcs.reduce(
  (a, f) => f(a), value
);

export const createPipe = (...funcs) => funcs.reduce(
  (f, g) => (...args) => g(f(...args))
);

export const curry = (fn, arity = fn.length, ...args) => (
  arity <= args.length
    ? fn(...args)
    : curry.bind(null, fn, arity, ...args)
);

export const idX = x => x;

export const compose = (...funcs) => (
  funcs.length && funcs.reduce((a, b) => (...args) => a(b(...args))) || idX
);
