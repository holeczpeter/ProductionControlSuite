export interface TreeItem<T> {
  node: T,
  children: Array<TreeItem<T>>,
  collapsed: boolean,
}
