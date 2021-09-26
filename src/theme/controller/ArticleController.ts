import { Article } from "../../core/model/article.model";
import { Commentaire } from "../../core/model/commentaire.model";
import { Request } from "../../core/server/request";
import { ArticleResource } from "../resources/article.format";
import { CommentaireResource } from "../resources/commentaire.format";
import { CommentaireController } from "./CommentaireController";

export class ArticleController {
  public static async get() {
    let articles = await new Article().findAll();
    return articles;
  }

  public static async findOne(request: Request) {
    try {
      const { data } = request;
      const id = data.params;
      const article_commentaires = await new Article().with('commentaire').find(id)
      if(article_commentaires.length > 0) {
      const article = ArticleResource.format(article_commentaires[0], id);
      let commentaires = [];
      article_commentaires.forEach(_commentaire => {
        if (_commentaire.id != null) {
          let commentaire = CommentaireResource.format(_commentaire);
          commentaires.push(commentaire);
        }
      });
      article['commentaires'] = commentaires;
      return article;

    } else {
      return {};
    }
    } catch (error) {
      console.log('error in single article (html)', error)
    }
  }

  public static async add(request: any) {
    try {
      const { title, content_article } = request.data.body;
      let article = await new Article().add({ title, content_article });
      return article;
    } catch (error) {
      console.log('error in post article (api)', error)
    }

  }
  public static async update(request: any) {
    try {
      const { title, content_article, id } = request.data.body;
      let article = await new Article().update({ title, content_article }, id);
      return article;

    } catch (error) {
      console.log('error for update article (api)', error)
    }
  }

  public static async delete(request: any) {
    try {
      const id = request.data.body;
      const commentaires = await new Commentaire().findAll({ article_id: id })
      if (commentaires.length == 0) {
        await new Article().delete(id);
        return 'Article supprimer';
      } else {
        commentaires.forEach(commentaire => {
          let req = {
            data: {
              body: commentaire.id
            }
          }
          CommentaireController.delete(req);
        })
        await new Article().delete(id);

      }

    } catch (error) {
      console.log('error for delete article (api)', error)
    }
  }


}