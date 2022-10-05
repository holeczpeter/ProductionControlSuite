export interface ApiResult {
  isSuccess: boolean,
  message: string,
  items: Array<any>,
  entities: any,
  errors: Array<string>,
  messages: Array<string>,
}
