/**
 * The Hermes JS engine does not do a stable sort: https://github.com/facebook/hermes/issues/212
 */
export function stableSort<T>(
  array: T[],
  ...compareFns: Array<(a: T, b: T) => number>
) {
  return compareFns.reduce((final, compareFn) => {
    return final
      .map((item, index) => ({item, index}))
      .sort((a, b) => compareFn(a.item, b.item) || a.index - b.index)
      .map(({item}) => item);
  }, array);
}
