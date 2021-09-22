import { Router } from "../../core/routes/router";
import { DashboardController } from "../controller/DashboardController";
import { ViewController } from "../controller/ViewController";

export class Routes {
  static build() {
    Router.get('/', 'articles-view', ViewController.articles)
    Router.get('/article/:id', 'article-view', ViewController.article);
    Router.get('/dashboard', 'dashboard-view', DashboardController.view);
    Router.get('/dashboard/articles', 'dashboard-articles-view', DashboardController.viewArticles);
    Router.get('/dashboard/article/:id', 'dashboard-article-view', DashboardController.viewArticle);
    Router.get('/404', 'not-found', ViewController.notFound)
    return Router.all();
  }

}