export interface Result {
  isSuccess: boolean,
  message: string,
  entities: any,
  errors: Array<string>,
}
export interface MenuItemModel {
  id: number,
  title: string,
  icon: string,
  path: string,
  type: MenuTypes,
  collapsed: boolean,
  children: Array<MenuItemModel>,
}
export interface GetAllMenuItem {
}
export interface AddWorkshop {
  name: string,
}
export interface DeleteWorkshop {
  id: number,
}
export interface UpdateWorkshop {
  id: number,
  name: string,
}
export interface WorkshopModel {
  id: number,
  name: string,
}
export interface GetAllWorkshops {
}
export interface GetWorkshop {
  id: number,
}
export enum MenuTypes {
  Module = 0,
  MainMenu = 1,
  SubMenu = 2,
}
export enum DefectCategories {
  F0 = 1,
  F1 = 2,
  F2 = 3,
}
export enum EntityStatuses {
  Active = 1,
  Deleted = 2,
  InActive = 3,
}
export enum LoginResults {
  Success = 0,
  IsTemporaryPassword = 1,
  IsNotValidPassword = 2,
  NotExistUser = 3,
  TokenError = 4,
}

