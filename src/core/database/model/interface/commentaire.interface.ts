import { Article } from "../article.model";

export interface iCommentaire {
  name: string,
  content: string,
  article: Article,
  
}