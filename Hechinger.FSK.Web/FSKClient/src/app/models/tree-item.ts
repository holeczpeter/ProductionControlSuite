export interface TreeItem<T> {
  node: T,
  children: Array<T>,
  collapsed: boolean,
}
