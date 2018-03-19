const defaultPayload = payload => ({ payload });

const call = (fn, args) => (
  typeof fn === 'function' ? fn(...args) : defaultPayload(...args)
);

export const actionCreator = (type, mapPayload) => Object.assign(
  (...args) => ({ type, ...call(mapPayload, args) }),
  { type }
);
