export interface iRoute {
  method: string,
  url: string,
  name: string,
  callback: any,
  regexp?: any
}