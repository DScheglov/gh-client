import deepFreeze from 'deep-freeze';
import { include, exclude, removeArrItem, appendArrItems } from '../helpers';

describe('reducers.include()', () => {
  it('should return [] if no argument is passed', () => {
    expect(include()).toEqual([]);
  });

  it('should return [item] on include(undefined, item)', () => {
    const $$item = Symbol('Item');
    expect(include(undefined, $$item)).toEqual([$$item]);
  });

  it('should return [item] on include([], item)', () => {
    const $$item = Symbol('Item');
    expect(include([], $$item)).toEqual([$$item]);
  });

  it('should return [item1, item2] on include([item1], item2)', () => {
    const $$item1 = Symbol('Item1');
    const $$item2 = Symbol('Item2');
    expect(include([$$item1], $$item2)).toEqual([$$item1, $$item2]);
  });

  it('should return the same set if item is already in list', () => {
    const $$item1 = Symbol('Item1');
    const $$item2 = Symbol('Item2');
    const set = [$$item1, $$item2];
    expect(include(set, $$item1)).toBe(set);
    expect(include(set, $$item2)).toBe(set);
  });
});

describe('reducers.exclude()', () => {
  it('should return [] if no argument is passed', () => {
    expect(exclude()).toEqual([]);
  });

  it('should return [] on exclude(undefined, item)', () => {
    const $$item = Symbol('Item');
    expect(exclude(undefined, $$item)).toEqual([]);
  });

  it('should return [] on exclude([item], item)', () => {
    const $$item = Symbol('Item');
    expect(exclude([$$item], $$item)).toEqual([]);
  });

  it('should return [item2] on exclude([item1, item2], item1)', () => {
    const $$item1 = Symbol('Item1');
    const $$item2 = Symbol('Item2');
    expect(exclude([$$item1, $$item2], $$item1)).toEqual([$$item2]);
  });

  it('should return the same set if item is not in list', () => {
    const $$item1 = Symbol('Item1');
    const $$item2 = Symbol('Item2');
    const $$item3 = Symbol('Item3');
    const set = [$$item1, $$item2];
    expect(exclude(set, $$item3)).toBe(set);
  });
});

describe('removeArrItem', () => {
  it('should remove item from not empty list', () => {
    const arr = [1, 2, 3, 4];
    deepFreeze(arr);
    const newArr = removeArrItem(arr, 1);
    expect(newArr).toEqual([1, 3, 4]);
    expect(newArr).not.toBe(arr);
  });

  it('should remove the first item from not empty list', () => {
    const arr = [1, 2, 3, 4];
    const newArr = removeArrItem(arr, 0);
    expect(newArr).toEqual([2, 3, 4]);
    expect(newArr).not.toBe(arr);
  });

  it('should remove the last item from not empty list', () => {
    const arr = [1, 2, 3, 4];
    deepFreeze(arr);
    const newArr = removeArrItem(arr, 3);
    expect(newArr).toEqual([1, 2, 3]);
    expect(newArr).not.toBe(arr);
  });

  it('should return new copy if index out of range', () => {
    const arr = [1, 2, 3, 4];
    deepFreeze(arr);
    const newArr = removeArrItem(arr, 100);
    expect(newArr).toEqual(arr);
    expect(newArr).not.toBe(arr);
  });

  it('should return an empty array if array is empty', () => {
    const arr = [];
    deepFreeze(arr);
    const newArr = removeArrItem(arr, 100);
    expect(newArr).toEqual(arr);
    expect(newArr).not.toBe(arr);
  });
});

describe('appendArrItems', () => {
  it('should add item to an empty list', () => {
    const arr = [];
    deepFreeze(arr);
    const newArr = appendArrItems(arr, '1');
    expect(newArr).toEqual(['1']);
    expect(newArr).not.toBe(arr);
  });

  it('should append item to not empty list', () => {
    const arr = ['1'];
    const newArr = appendArrItems(arr, '2');
    expect(newArr).toEqual(['1', '2']);
    expect(newArr).not.toBe(arr);
  });
});
