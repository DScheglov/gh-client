export const removeArrItem = (arr, index) => [
  ...arr.slice(0, index), ...arr.slice(index + 1)
];

export const appendArrItems = (arr, item) => [...arr, item];

export const include = (set = [], item) => (
  (item == null) || set.includes(item) ? set : [...set, item]
);

export const exclude = (set = [], item) => {
  if (item == null) return set;
  const index = set.indexOf(item);
  if (index < 0) return set;
  return removeArrItem(set, index);
};
