import { Database } from "../database/database";
export class ArticleController {
  public static get() {
    let articles: any = Database.query('SELECT * from article');
    return articles;
  }

}