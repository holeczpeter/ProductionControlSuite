import { TreeItem } from '../tree-item';
export interface ApplicationInfo {
  version: string,
  copyRight: string,
  enviromentName: string,
}
export interface ConfirmDialogData {
  title: string,
  content: string,
  buttons: Array<ConfirmDialogResult>,
  type: ConfirmationTypes,
}
export interface ConfirmDialogResult {
  text: string,
  value: boolean,
}
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
  avatarType: AvatarTypes,
  accessMenu: Array<any>,
}
export interface UserInfo {
  id: number,
  code: string,
  name: string,
  roleName: string,
  roleTranslatedName: string,
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
export interface DashboardCrapCostChartModel {
  items: Array<DashboardWorkshopCrapCost>,
  interval: IntervalModel,
}
export interface DashboardWorkshopCrapCost {
  workshopId: number,
  workshopName: string,
  value: any,
}
export interface DashboardPpmChartModel {
  items: Array<DashboardWorkshopPpm>,
  interval: IntervalModel,
}
export interface DashboardWorkshopPpm {
  workshopId: number,
  workshopName: string,
  ppm: any,
}
export interface PpmWarning {
  operationId: number,
  operationName: string,
  operationTranslatedName: string,
  operationCode: string,
  date: Date,
  shiftId: number,
  quantity: number,
  defectQuantity: number,
  ppm: any,
  summaryGoal: number,
}
export interface SummaryModel {
  title: string,
  value: string,
  currency: string,
  icon: string,
  subtitle: string,
  color: string,
}
export interface WorkshopProduction {
  workshopId: number,
  workshopName: string,
  days: Array<ProductionDayInfo>,
}
export interface ProductionDayInfo {
  workshopId: number,
  date: Date,
  quantity: number,
  defectQuantity: number,
}
export interface WorkshopProductionChartModel {
  item: WorkshopProduction,
  interval: IntervalModel,
}
export interface WorkshopUserInfo {
  workshopName: string,
  count: number,
}
export interface GetDashboardWorkshopCrapCost {
  startDate: Date,
  endDate: Date,
}
export interface GetDashboardWorkshopPpm {
  startDate: Date,
  endDate: Date,
}
export interface GetPpmWarnings {
  startDate: Date,
  endDate: Date,
}
export interface GetWorkshopProduction {
  startDate: Date,
  endDate: Date,
}
export interface GetWorkshopUserStats {
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
export interface DefectCategoryModel {
  name: string,
  category: DefectCategories,
}
export interface DefectModel {
  id: number,
  name: string,
  translatedName: string,
  code: string,
  order: number,
  defectCategory: DefectCategories,
  operationId: number,
  operationCode: string,
  operationName: string,
  operationTranslatedName: string,
  defectCategoryName: string,
}
export interface ParameterResult {
  count: number,
  result: Array<any>,
}
export interface GetAllDefectByParameters {
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
export interface GetAllDefects {
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
  parameters: DefectRequestParameters,
}
export interface CreateEntityGroup {
  current: TreeItem<EntityGroupModel>,
}
export interface EntityGroupModel {
  id: number,
  name: string,
  translatedName: string,
  parentId: number,
  order: number,
  groupType: GroupTypes,
  relations: Array<EntityGroupRelationModel>,
  ppmGoal: number,
}
export interface DeleteEntityGroup {
  id: number,
}
export interface SaveEntityGroup {
  current: TreeItem<EntityGroupModel>,
}
export interface EntityGroupRelationModel {
  id: number,
  order: number,
  code: string,
  name: string,
  translatedName: string,
  entityGroupId: number,
  entityId: number,
  parentId: number,
  entityType: EntityTypes,
}
export interface EntityGroupRelationTree {
  node: EntityGroupRelationModel,
  children: Array<EntityGroupRelationTree>,
  collapsed: boolean,
}
export interface GetAllEntityGroups {
}
export interface GetDefectsForRelation {
  operationIds: string,
  groupId: number,
}
export interface GetEntityGroupById {
  id: number,
}
export interface GetEntityRelationsByProducts {
  productIds: string,
  groupId: number,
}
export interface GetGroupTypes {
  isAll: boolean,
}
export interface GetOperationsForRelation {
  productIds: string,
  groupId: number,
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
  ppmGoal: number,
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
  ppmGoal: number,
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
  order: number,
  ppmGoal: number,
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
  defectCategory: DefectCategories,
}
export interface GetAllOperation {
}
export interface GetAllOperationByParameters {
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
  order: number,
  norma: any,
  defects: Array<DefectContext>,
  ppmGoal: number,
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
  order: number,
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
export interface GetProductsByParameters {
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
export interface GetProductsCount {
  parameters: RequestParameters,
}
export interface CrapCostDayModel {
  operationId: number,
  date: Date,
  quantity: number,
  defectQuantity: number,
  operationTime: any,
  value: any,
}
export interface CrapCostOperationModel {
  operationId: number,
  operationName: string,
  operationCode: string,
  operationTranslatedName: string,
  operationTime: any,
  quantity: number,
  defectQuantity: number,
  value: any,
  days: Array<CrapCostDayModel>,
}
export interface CrapCostProductModel {
  productId: number,
  productName: string,
  productCode: string,
  productTranslatedName: string,
  quantity: number,
  defectQuantity: number,
  value: any,
  operations: Array<CrapCostOperationModel>,
}
export interface CrapCostWorkshopModel {
  workshopId: number,
  workshopName: string,
  quantity: number,
  defectQuantity: number,
  value: any,
  products: Array<CrapCostProductModel>,
}
export interface GetCrapCostByOperation {
  operationId: number,
  startDate: Date,
  endDate: Date,
}
export interface GetCrapCostByProduct {
  productId: number,
  startDate: Date,
  endDate: Date,
}
export interface GetCrapCostByWorkshop {
  workshopId: number,
  startDate: Date,
  endDate: Date,
}
export interface GroupReportModel {
  name: string,
  translatedName: string,
  ppmGoal: number,
  view: Views,
  items: Array<OperationItem>,
}
export interface OperationItem {
  operationId: number,
  operationName: string,
  operationTranslatedName: string,
  operationCode: string,
  operationCodes: string,
  quantity: number,
  defects: Array<DefectItem>,
  periodItems: Array<PeriodItem>,
  order: number,
}
export interface DefectItem {
  defectId: number,
  defectCode: string,
  defectName: string,
  defectTranslatedName: string,
  quantity: number,
  defectQuantity: number,
  ppm: any,
  periodItems: Array<PeriodItem>,
  defectCategory: DefectCategories,
  order: any,
}
export interface PeriodItem {
  periodNumber: number,
  defectCategory: DefectCategories,
  defectQuantity: number,
  quantity: number,
  ppm: any,
}
export interface GroupReportYearlySummaryItem {
  year: number,
  month: number,
  value: any,
}
export interface GroupReportYearlySummaryModel {
  year: number,
  productName: string,
  productTranslatedName: string,
  productCode: string,
  category: DefectCategories,
  categoryName: string,
  items: Array<GroupReportYearlySummaryItem>,
  goal: number,
  avarage: any,
}
export interface SummaryCardDailyItem {
  date: Date,
  quantity: number,
  defectQuantity: number,
  category: DefectCategories,
}
export interface GetGroupReport {
  entityGroupId: number,
  startDate: Date,
  endDate: Date,
  view: Views,
}
export interface GetGroupReportYearlySummary {
  entityGroupId: number,
  year: number,
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
  quantity: number,
  defectQuantity: number,
  ppm: any,
  days: Array<QuantityDayReportModel>,
}
export interface QuantityOperationDayModel {
  operationId: number,
  date: Date,
  shiftId: number,
  quantity: number,
  defectQuantity: number,
  ppm: any,
}
export interface QuantityDayReportModel {
  date: Date,
  shiftId: number,
  defectQuantity: number,
  ppm: any,
  quantity: number,
}
export interface GetQuantityReportByOperation {
  operationId: number,
  startDate: Date,
  endDate: Date,
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
  ppm: any,
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
  ppm: any,
}
export interface GetDefectStatisticsByUser {
  workerCode: string,
  operationId: number,
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
  defectCode: string,
  defectCategory: DefectCategories,
  defectCategoryName: string,
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
}
export interface GetAllSummaryCardsByParameters {
  parameters: SummaryCardRequestParameters,
}
export interface SummaryCardRequestParameters {
  date?: any,
  created?: any,
  startDate: Date,
  endDate: Date,
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
  avatarType: AvatarTypes,
}
export interface UserSettingsModel {
  id: number,
  languageId: number,
  pageSize: number,
  avatarType: AvatarTypes,
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
export interface GetWorkshopByFilter {
  filter: string,
}
export enum ConfirmationTypes {
  Information = 0,
  Warning = 1,
  Error = 2,
  Delete = 3,
  Success = 4,
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
export enum AvatarTypes {
  Male = 0,
  Female = 1,
}
export enum DefectCategories {
  F0 = 0,
  F1 = 1,
  F2 = 2,
}
export enum GroupTypes {
  Group = 0,
  Head = 1,
  Item = 2,
}
export enum EntityTypes {
  Product = 0,
  Operation = 1,
  Defect = 2,
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
export enum EnvironmentTypes {
  TEST = 0,
  PROD = 1,
}

