export interface EnumModel {
  id: number,
  name: string,
}
export interface IntervalModel {
  startDate: Date,
  endDate: Date,
  differenceInCalendarDays: number,
  selectedView: Views,
  currentYear: number,
  currentMonth: number,
  currentMonthName: string,
  currentWeek: number,
}
export interface IntervalOption {
  name: string,
  value: Views,
  isDefault: boolean,
}
export interface MonthExtension {
  name: string,
  value: number,
  stringValue: string,
}
export interface Result {
  isSuccess: boolean,
  message: string,
  entities: any,
  errors: Array<string>,
}
export interface SelectModel {
  id: number,
  name: string,
  translatedName: string,
  code: string,
}
export interface ChangePassword {
  code: string,
  oldPassword: string,
  newPassword: string,
}
export interface ChangePasswordByAdmin {
  code: string,
  newPassword: string,
}
export interface ForgotPassword {
  code: string,
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
export interface TokenRequestModel {
  token: string,
  userId: number,
  refreshToken: string,
}
export interface UserDataModel {
  userInfo: UserInfo,
  token: string,
  refreshToken: string,
  loginStatus: LoginResults,
  pageSize: number,
  languageCode: string,
  accessMenu: Array<any>,
}
export interface UserInfo {
  id: number,
  code: string,
  name: string,
}
export interface UserTokenInfo {
  userId: number,
  expiration: Date,
  refreshToken: string,
}
export interface GetAccessMenu {
  userId: number,
}
export interface GetUserTokenInfo {
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
  operationCode: string,
  operationName: string,
  operationTranslatedName: string,
  defectCategoryName: string,
}
export interface GetAllDefect {
  parameters: DefectRequestParameters,
}
export interface DefectRequestParameters {
  operationName: string,
  operationTranslatedName: string,
  operationCode: string,
  defectCategoryName: string,
  lang: string,
  code: string,
  name: string,
  translatedName: string,
  orderBy: string,
  isAsc: boolean,
  page: number,
  pageCount: number,
}
export interface GetAllDefectCategories {
}
export interface GetDefect {
  id: number,
}
export interface GetDefectByFilter {
  filter: string,
}
export interface GetDefectsByOperation {
  operationId: number,
}
export interface GetDefectsCount {
  parameters: RequestParameters,
}
export interface RequestParameters {
  lang: string,
  code: string,
  name: string,
  translatedName: string,
  orderBy: string,
  isAsc: boolean,
  page: number,
  pageCount: number,
}
export interface DefectImport {
  file: any,
}
export interface OperationImport {
  file: any,
}
export interface SummaryCardImport {
  file: any,
}
export interface ImportError {
  type: string,
  code: string,
  errorText: string,
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
  translatedTitle: string,
  icon: string,
  path: string,
  type: MenuTypes,
  parentId: number,
  order: number,
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
  productCode: string,
  productName: string,
  productTranslatedName: string,
  hasDefect: boolean,
}
export interface OperationPrintModel {
  id: number,
  name: string,
  translatedName: string,
  code: string,
  productId: number,
  productName: string,
  productCode: string,
  defects: Array<DefectPrintModel>,
}
export interface DefectPrintModel {
  id: number,
  order: number,
  name: string,
  translatedName: string,
  code: string,
}
export interface GetAllOperation {
  parameters: OperationRequestParameters,
}
export interface OperationRequestParameters {
  productName: string,
  productTranslatedName: string,
  productCode: string,
  lang: string,
  code: string,
  name: string,
  translatedName: string,
  orderBy: string,
  isAsc: boolean,
  page: number,
  pageCount: number,
}
export interface GetOperation {
  id: number,
}
export interface GetOperationByFilter {
  filter: string,
}
export interface GetOperationPrint {
  id: number,
}
export interface GetOperationsByProduct {
  productId: number,
}
export interface GetOperationsCount {
  parameters: RequestParameters,
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
export interface SaveProductContext {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  workshopId: number,
  operations: Array<OperationContext>,
}
export interface OperationContext {
  id: number,
  name: string,
  translatedName: string,
  code: string,
  operationTime: any,
  norma: any,
  defects: Array<DefectContext>,
}
export interface UpdateProduct {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  workshopId: number,
}
export interface ProductContext {
  id: number,
  name: string,
  code: string,
  translatedName: string,
  workshopId: number,
  operations: Array<OperationContext>,
}
export interface DefectContext {
  id: number,
  name: string,
  translatedName: string,
  code: string,
  defectCategory: DefectCategories,
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
  parameters: ProductRequestParameters,
}
export interface ProductRequestParameters {
  workshopName: string,
  lang: string,
  code: string,
  name: string,
  translatedName: string,
  orderBy: string,
  isAsc: boolean,
  page: number,
  pageCount: number,
}
export interface GetProduct {
  id: number,
}
export interface GetProductByFilter {
  filter: string,
}
export interface GetProductContext {
  id: number,
}
export interface GetProductsCount {
  parameters: RequestParameters,
}
export interface DefectStatisticModel {
  workerCode: string,
  operationCode: string,
  operationName: string,
  operationTranslatedName: string,
  startDate: Date,
  endDate: Date,
  items: Array<DefectStatisticsItem>,
}
export interface DefectStatisticsItem {
  defectCode: string,
  defectName: string,
  defectTranslatedName: string,
  defectCategory: DefectCategories,
  defectCategoryName: string,
  quantity: number,
  defectQuantity: number,
  ppm: number,
}
export interface MonthlyQualityItem {
  year: number,
  month: number,
  value: number,
}
export interface MonthlyQualityModel {
  year: number,
  productName: string,
  productTranslatedName: string,
  productCode: string,
  category: DefectCategories,
  categoryName: string,
  items: Array<MonthlyQualityItem>,
  goal: number,
  avarage: any,
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
export interface QuantityOperationReportModel {
  operationId: number,
  operationName: string,
  operationTranslatedName: string,
  operationCode: string,
  quantity: number,
  defects: Array<QuantityDefectReportModel>,
  days: Array<QuantityOperationDayModel>,
}
export interface QuantityDefectReportModel {
  defectId: number,
  defectCode: string,
  defectName: string,
  defectTranslatedName: string,
  defectCategory: DefectCategories,
  ppm: number,
  defectQuantity: number,
  days: Array<QuantityDayReportModel>,
}
export interface QuantityOperationDayModel {
  operationId: number,
  date: Date,
  shiftId: number,
  quantity: number,
}
export interface QuantityDayReportModel {
  date: Date,
  shiftId: number,
  defectQuantity: number,
  ppm: number,
}
export interface WorkerStatisticsModel {
  defectId: number,
  defectName: string,
  defectTranslatedName: string,
  defectCategory: DefectCategories,
  startDate: Date,
  endDate: Date,
  items: Array<WorkerStatisticsItem>,
}
export interface WorkerStatisticsItem {
  workerCode: string,
  quantity: number,
  defectQuantity: number,
  ppm: number,
}
export interface GetDefectStatisticsByUser {
  workerCode: string,
  operationId: number,
  startDate: Date,
  endDate: Date,
}
export interface GetMonthlyQualityHistory {
  productId: number,
  year: number,
}
export interface GetQualityAssurance {
  productId: number,
  startDate: Date,
  endDate: Date,
  view: Views,
}
export interface GetQuantityReportByOperation {
  operationId: number,
  startDate: Date,
  endDate: Date,
}
export interface GetQuantityReportByProduct {
  productId: number,
  startDate: Date,
  endDate: Date,
}
export interface GetWorkerStatisticsByDefect {
  defectId: number,
  startDate: Date,
  endDate: Date,
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
  userId: number,
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
  userId: number,
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
  defectTranslatedName: string,
}
export interface SummaryCardModel {
  id: number,
  date: Date,
  created: Date,
  shiftName: string,
  shiftTranslatedName: string,
  userName: string,
  workerName: string,
  operationCode: string,
  operationName: string,
  operationTranslatedName: string,
  quantity: number,
}
export interface GetAllSummaryCards {
  parameters: SummaryCardRequestParameters,
}
export interface SummaryCardRequestParameters {
  date: string,
  created: string,
  operationCode: string,
  operationName: string,
  operationTranslatedName: string,
  userName: string,
  shiftName: string,
  shiftTranslatedName: string,
  quantity: string,
  workerName: string,
  lang: string,
  code: string,
  name: string,
  translatedName: string,
  orderBy: string,
  isAsc: boolean,
  page: number,
  pageCount: number,
}
export interface GetSummaryCard {
  id: number,
}
export interface GetSummaryCardsCount {
  parameters: SummaryCardRequestParameters,
}
export interface AddUser {
  id: number,
  code: string,
  firstName: string,
  lastName: string,
  roleId: number,
  languageId: number,
  password: string,
  workshops: Array<WorkshopUserItem>,
}
export interface WorkshopUserItem {
  id: number,
  name: string,
  code: string,
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
  workshops: Array<WorkshopUserItem>,
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
export interface GetWorkshopsByUser {
  userId: number,
}
export interface GetWorkshopsExceptByUser {
  userId: number,
}
export interface UpdateUserSettings {
  id: number,
  languageId: number,
  pageSize: number,
}
export interface UserSettingsModel {
  id: number,
  languageId: number,
  pageSize: number,
}
export interface GetUserSettings {
  id: number,
}
export interface WorkerModel {
  workerCode: string,
}
export interface GetAllWorker {
}
export interface GetWorkersByFilter {
  filter: string,
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
export interface GetWorkshopPPmData {
  startDate: Date,
  endDate: Date,
}
export interface WorkshopPpmData {
  workshopId: number,
  workshopName: string,
  ppm: number,
  quantity: any,
  defectQuantity: number,
}
export enum Views {
  Day = 0,
  Week = 1,
  Month = 2,
  Year = 3,
}
export enum LoginResults {
  Success = 0,
  IsTemporaryPassword = 1,
  IsNotValidPassword = 2,
  NotExistUser = 3,
  TokenError = 4,
}
export enum DefectCategories {
  F0 = 0,
  F1 = 1,
  F2 = 2,
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

