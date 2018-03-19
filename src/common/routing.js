import { createSelector } from 'reselect';
import { domainSelector } from '../utils/selectors';

export const domain = domainSelector(_ => _.routing);
export const getLocation = createSelector(domain, _ => _.location.pathname);

const parsePath = path => path.split('/').reduce(
  (res, part, index) => (
    /:[^:]+/.test(part)
      ? Object.assign(res, { [index]: part.substr(1) })
      : res
  ), {}
);

export const getRouterParams = createSelector(
  getLocation, (_, path) => parsePath(path),
  (location, params) => location.split('/').reduce(
    (values, value, index) => (
      params[index] != null
        ? Object.assign(values, { [params[index]]: value })
        : values
    ), {}
  )
);

export const getRouterParam = createSelector(
  getRouterParams, (_, __, name) => name,
  (params, name) => params[name]
);
