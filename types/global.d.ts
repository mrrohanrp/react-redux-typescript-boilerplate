/** Global definitions for development **/

// for style loader
declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}
declare module '*.scss' {
  const styles: Record<string, string>;
  export default styles;
}

/**
 * Make all properties in T optional
 * and
 * From T, pick a set of properties whose keys are in the union K
 */
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
