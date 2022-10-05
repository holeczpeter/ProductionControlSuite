export interface MenuItemModel {
  id: number;
  title: string;
  icon: string;
  route: string;
  subMenuItems: Array<MenuItemModel>;
}
