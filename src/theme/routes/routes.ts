import { Router } from "../../core/routes/router";
import { ViewController } from "../controller/ViewController";

export class Routes {
  static build() {
    Router.get('/', 'home', ViewController.home)
    Router.get('/about', 'about', ViewController.about)
    Router.get('/contact', 'contact', ViewController.contact)
    Router.get('/articles', 'articles-view', ViewController.articles)
    Router.get('/article/:id','article-view', ViewController.article);
    Router.get('/404', 'not-found', ViewController.notFound)
    return Router.all();
  }

}