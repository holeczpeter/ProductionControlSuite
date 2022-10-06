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
export interface AddProduct {
  name: string,
  code: string,
  translatedName: string,
  workshopId: number,
}
export interface DeleteProduct {
  id: number,
}
export interface UpdateProduct {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  workshopId: number,
}
export interface ProductModel {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  workshopId: number,
  workshopName: string,
}
export interface GetAllProducts {
}
export interface GetProduct {
  id: number,
}
export interface AddWorkshop {
  name: string,
  translatedName: string,
}
export interface DeleteWorkshop {
  id: number,
}
export interface UpdateWorkshop {
  id: number,
  name: string,
  translatedName: string,
}
export interface WorkshopModel {
  id: number,
  name: string,
  translatedName: string,
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

