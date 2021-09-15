import { iField } from "./field.interface";

export interface iModel {
  fields: Array<iField>,
  table: string,
}