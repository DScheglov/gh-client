import { domainSelector } from '../selectors';

describe('Utils.selectors.domainSelector', () => {
  test('new should create an instance of Function', () => {
    const pathSelector = domainSelector();
    expect(pathSelector).toBeInstanceOf(Function);
  });

  test('should use "identity" as default _selector', () => {
    const pathSelector = domainSelector();
    const sTest = Symbol('Test');
    expect(pathSelector(sTest)).toBe(sTest);
  });

  test('wrap() should return a function that selects data', () => {
    const pathSelector = domainSelector();
    const idSel = state => state.id;
    const getId = pathSelector.wrap(idSel);
    expect(getId).toBeInstanceOf(Function);
    expect(getId({ id: 1 })).toBe(1);
    const appDomain = domainSelector(state => state.app);
    pathSelector.attachTo(appDomain);
    expect(getId({ app: { id: 1 } })).toBe(1);
  });

  test('attachTo() should attach this selector to the parent', () => {
    const pathSelector = domainSelector(state => state.branch);
    const parentSelector = domainSelector(state => state.root);
    expect(pathSelector({ branch: 'branch' })).toEqual('branch');
    pathSelector.attachTo(parentSelector);
    expect(() => pathSelector({ branch: 'branch' })).toThrow();
    expect(pathSelector({ root: { branch: 'branch' } })).toEqual('branch');
  });

  test('mount() should attach several selectors', () => {
    const leftDomain = domainSelector(state => state.left);
    const rightDomain = domainSelector(state => state.right);
    const appDomain = domainSelector(state => state.app);
    appDomain.mount(leftDomain, rightDomain);
    const state = {
      app: {
        left: 'left',
        right: 'right',
      }
    };
    expect(leftDomain(state)).toEqual('left');
    expect(rightDomain(state)).toEqual('right');
  });
});
