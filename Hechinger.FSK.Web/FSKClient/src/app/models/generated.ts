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
export interface AddOperation {
  name: string,
  code: string,
  translatedName: string,
  productId: number,
  operationTime: any,
  norma: any,
}
export interface DeleteOperation {
  id: number,
}
export interface UpdateOperation {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  productId: number,
  operationTime: any,
  norma: any,
}
export interface OperationModel {
  id: number,
  name: string,
  translatedName: string,
  code: string,
  operationTime: any,
  norma: any,
  productId: number,
  productName: string,
  productCode: string,
}
export interface GetAllOperation {
}
export interface GetOperation {
  id: number,
}
export interface GetOperationsByProduct {
  productId: number,
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
  operations: Array<OperationModel>,
}
export interface GetAllProducts {
}
export interface GetProduct {
  id: number,
}
export interface AddShift {
  name: string,
  shortName: string,
  translatedName: string,
  translatedShortName: string,
  start: any,
  end: any,
}
export interface DeleteShift {
  id: number,
}
export interface UpdateShift {
  id: number,
  name: string,
  shortName: string,
  translatedName: string,
  translatedShortName: string,
  start: any,
  end: any,
}
export interface ShiftModel {
  id: number,
  name: string,
  shortName: string,
  translatedName: string,
  translatedShortName: string,
  start: any,
  end: any,
}
export interface GetAllShifts {
}
export interface GetShift {
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

