import { Article } from "../../core/database/model/article.model";
import { Request } from "../../core/server/request";

export class ArticleController {
  public static async get() {
    let articles = await new Article().findAll();
    return articles;
  }

  public static async findOne(request: Request) {
    try {
      const { data } = request;
      const id = data.params;
      const article = await new Article().find(id)
      return article;
    } catch (error) {
      console.log('error in single article (html)', error)
    }
  }

  public static async add(request: any) {
    try {
      const { title, content } = request.data.body;
      let article = await new Article().add({ title, content });
      return article;
    } catch (error) {
      console.log('error in post article (api)', error)
    }

  }
  public static async update(request: any) {
    try {
      const { title, content, id } = request.data.body;
      let article = await new Article().update({ title, content }, id);
      return article;

    } catch (error) {
      console.log('error in post article (api)', error)
    }
  }

}