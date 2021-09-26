import { Router } from "../../core/routes/router";
import { ArticleController } from "../controller/ArticleController";
import { ThemeController } from "../controller/ThemeController";
import { CommentaireController } from "../controller/CommentaireController";
import { AuthController } from "../controller/AuthController";
export class RoutesApi {
  static build() {
    Router.get('/api/articles', 'articles-get', ArticleController.get)
    Router.post('/api/articles/add', 'articles-add', ArticleController.add)
    Router.get('/api/article/:id', 'article-get', ArticleController.findOne)
    Router.post('/api/articles/update', 'article-update', ArticleController.update)
    Router.post('/api/articles/delete', 'article-delete', ArticleController.delete)

    Router.get('/api/article/commentaires/:id', 'commentaires-get', CommentaireController.get)
    Router.post('/api/commentaires/add', 'commentaire-add', CommentaireController.add)
    Router.post('/api/commentaires/delete', 'commentaire-delete', CommentaireController.delete)
    Router.get('/api/theme/select/:id', 'theme-select', ThemeController.select)
    Router.get('/api/themes', 'themes-get', ThemeController.get);

    Router.post('/api/login', 'login', AuthController.login)
    Router.get('/api/logout', 'logout', AuthController.logout)

    return Router.all();
  }

}