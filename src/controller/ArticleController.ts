import { Database } from "../database/database";
import { Article } from "../database/model/article.model";

export class ArticleController {
  public static async get() {
    let articles = await Article.findAll('article');
    return articles;
  }

  //TODO Pas encore fonctionnel
  public static async add(request) {
    let article;

    const add = await Database.query("INSERT INTO article (fields, type) VALUES ('" + request.fields + "', '" + request.type + "')", function (result) {
      article = new Article(result.fields, result.type)
    });

    return article;
  }

}