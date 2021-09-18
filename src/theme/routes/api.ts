import { Router } from "../../core/routes/router";
import { ArticleController } from "../controller/ArticleController";
import { CommentaireController } from "../controller/CommentaireController";

export class RoutesApi {
  static build() {
    Router.get('/api/articles', 'articles-get', ArticleController.get)
    Router.post('/api/articles/add', 'articles-add', ArticleController.add)
    Router.get('/api/article/:id', 'article-get', ArticleController.findOne)
    Router.get('/api/article/commentaires/:id', 'commentaires-get', CommentaireController.get)
    Router.post('/api/commentaires/add', 'commentaire-add', CommentaireController.add)


    return Router.all();
  }

}