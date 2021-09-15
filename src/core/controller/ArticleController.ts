import { Article } from "../database/model/article.model";
import {Request} from '../server/request'
export class ArticleController {
  public static async get() {

    let articles = await new Article().findAll();
    return articles;
  }

  public static async add() {
    let articles = await new Article().add();
    return articles;
  }

}