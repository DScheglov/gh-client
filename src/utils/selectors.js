import { createSelector } from 'reselect';
import { compose, idX } from './funcs';

const wrap = dSelector => selector => (state, ...args) => selector(
  dSelector.selector(state), ...args
);

const attachTo = dSelector => parent => {
  dSelector.selector = parent.wrap(dSelector.selector);
  return dSelector;
};

const mount = self => (...children) => children.forEach(
  child => child.attachTo(self)
);

const selector = dSelector => (...args) => dSelector.selector(...args);

const domainSelectorConstructor = (branchSelector = idX) => ({
  selector: branchSelector
});

const domainSelectorInterface = dSelector => (
  self => Object.assign(self, {
    wrap: wrap(dSelector),
    attachTo: attachTo(dSelector),
    mount: mount(self),
  })
)(selector(dSelector));

export const domainSelector = compose(
  domainSelectorInterface,
  domainSelectorConstructor
);

export const cacheSelectors = getCacheKey => (...selectors) => {
  const cache = {};
  const ensureSelector = id => (
    cache[id] ||
    Object.assign(cache, { [id]: createSelector(...selectors) })[id]
  );
  return (state, props) => ensureSelector(getCacheKey(props))(state, props);
};

export const dedicatedSelector = cacheSelectors(props => props.id);

export { createSelector };
