export interface EnumModel {
  id: number,
  name: string,
}
export interface Result {
  isSuccess: boolean,
  message: string,
  entities: any,
  errors: Array<string>,
}
export interface ChangePassword {
  code: string,
  oldPassword: string,
  newPassword: string,
}
export interface LoginModel {
  code: string,
  password: string,
}
export interface UserRefreshToken {
  userId: number,
  expiration: Date,
  token: string,
  refreshToken: string,
}
export interface UserDataModel {
  userInfo: UserInfo,
  token: string,
  refreshToken: string,
  loginStatus: LoginResults,
}
export interface UserInfo {
  id: number,
  code: string,
  name: string,
}
export interface GetAccessMenu {
  userId: number,
}
export interface AddDefect {
  name: string,
  code: string,
  translatedName: string,
  operationId: number,
  defectCategory: DefectCategories,
}
export interface DeleteDefect {
  id: number,
}
export interface UpdateDefect {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  operationId: number,
  defectCategory: DefectCategories,
}
export interface DefectModel {
  id: number,
  name: string,
  translatedName: string,
  code: string,
  defectCategory: DefectCategories,
  operationId: number,
  operationName: string,
  operationCode: string,
}
export interface GetAllDefect {
}
export interface GetAllDefectCategories {
}
export interface GetDefect {
  id: number,
}
export interface GetDefectsByOperation {
  operationId: number,
}
export interface LanguageModel {
  id: number,
  name: string,
  translatedName: string,
}
export interface GetAllLanguages {
}
export interface MenuItemModel {
  id: number,
  title: string,
  icon: string,
  path: string,
  type: MenuTypes,
  parentId: number,
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
export interface QualityAssuranceProductModel {
  productId: number,
  productName: string,
  productCode: string,
  operations: Array<QualityAssuranceOperationItemModel>,
}
export interface QualityAssuranceOperationItemModel {
  operationId: number,
  operationName: string,
  operationCode: string,
  quantity: number,
  defects: Array<QualityAssuranceDefectModel>,
}
export interface QualityAssuranceDefectModel {
  defectId: number,
  defectName: string,
  defectCode: string,
  category: DefectCategories,
  models: Array<QualityAssuranceModel>,
  sumQuantity: number,
  sumPPM: number,
}
export interface QualityAssuranceModel {
  date: Date,
  month: number,
  quantity: number,
}
export interface GetQualityAssurance {
}
export interface AddRole {
  name: string,
  code: string,
  translatedName: string,
  isDefault: boolean,
  users: Array<RoleUserItem>,
  menu: Array<RoleMenuItem>,
}
export interface RoleUserItem {
  id: number,
  fullName: string,
  code: string,
}
export interface RoleMenuItem {
  id: number,
  title: string,
  type: MenuTypes,
  parentId: number,
  isEnabled: boolean,
}
export interface DeleteRole {
  id: number,
}
export interface SetDefaultRole {
  id: number,
}
export interface UpdateRole {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  isDefault: boolean,
  users: Array<RoleUserItem>,
  menu: Array<RoleMenuItem>,
}
export interface RoleDetailModel {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  isDefault: boolean,
}
export interface RoleModel {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  isDefault: boolean,
}
export interface GetAllRoles {
}
export interface GetMenuByRole {
  roleId: number,
}
export interface GetRole {
  id: number,
}
export interface GetUsersByRole {
  roleId: number,
}
export interface GetUsersExceptByRole {
  roleId: number,
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
export interface AddSummaryCard {
  date: Date,
  worker: string,
  operationId: number,
  quantity: number,
  los: string,
  shiftId: number,
  items: Array<AddSummaryCardItem>,
}
export interface AddSummaryCardItem {
  defectId: number,
  quantity: number,
  comment: string,
}
export interface DeleteSummaryCard {
  id: number,
}
export interface UpdateSummaryCard {
  id: number,
  date: Date,
  worker: string,
  operationId: number,
  quantity: number,
  los: string,
  shiftId: number,
  items: Array<UpdateSummaryCardItem>,
}
export interface UpdateSummaryCardItem {
  id: number,
  defectId: number,
  quantity: number,
  comment: string,
}
export interface SummaryCardDetailModel {
  id: number,
  date: Date,
  worker: string,
  operationId: number,
  quantity: number,
  los: string,
  shiftId: number,
  items: Array<SummaryCardItemModel>,
}
export interface SummaryCardItemModel {
  id: number,
  defectId: number,
  defectName: string,
  quantity: number,
  order: number,
  comment: string,
}
export interface SummaryCardModel {
  id: number,
  date: Date,
  created: Date,
  shiftName: string,
  userName: string,
  workerName: string,
  operationCode: string,
  operationName: string,
  quantity: number,
}
export interface GetAllSummaryCards {
}
export interface GetSummaryCard {
  id: number,
}
export interface AddUser {
  id: number,
  code: string,
  firstName: string,
  lastName: string,
  roleId: number,
  languageId: number,
  password: string,
}
export interface DeleteUser {
  id: number,
}
export interface UpdateUser {
  id: number,
  code: string,
  firstName: string,
  lastName: string,
  roleId: number,
  languageId: number,
  password: string,
}
export interface UserModel {
  id: number,
  code: string,
  firstName: string,
  lastName: string,
  fullName: string,
  roleId: number,
  roleName: string,
  languageId: number,
  languageName: string,
  status: EntityStatuses,
  statusName: string,
}
export interface GetAllUsers {
}
export interface GetUser {
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
export interface GetUserTokenInfo {
  userId: number,
}
export interface TokenRequestModel {
  token: string,
  userId: number,
  refreshToken: string,
}
export interface UserTokenInfo {
  userId: number,
  expiration: Date,
  refreshToken: string,
}
export enum LoginResults {
  Success = 0,
  IsTemporaryPassword = 1,
  IsNotValidPassword = 2,
  NotExistUser = 3,
  TokenError = 4,
}
export enum DefectCategories {
  F0 = 1,
  F1 = 2,
  F2 = 3,
}
export enum MenuTypes {
  Module = 0,
  MainMenu = 1,
  SubMenu = 2,
}
export enum EntityStatuses {
  Active = 1,
  Deleted = 2,
  InActive = 3,
}

