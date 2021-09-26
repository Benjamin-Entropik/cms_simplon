import { iArticle } from "./article.interface";

export interface iModel {
  fields: Array<iArticle>,
  table: string,
}