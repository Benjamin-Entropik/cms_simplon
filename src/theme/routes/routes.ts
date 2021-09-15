import { Router } from "./router";
import { ViewController } from "../../core/controller/ViewController";
import { Request } from "../../core/server/request";
import { ArticleController } from "../../core/controller/ArticleController";

export class Routes {
  static build() {
    const router = Router.getInstance();
    router.get('/', 'home', ViewController.home())
    router.get('/about', 'about', ViewController.about())
    router.get('/contact', 'contact', ViewController.contact())
    router.get('/articles', 'articles-view', ViewController.articles())
    router.get('/404', 'not-found', ViewController.notFound())
    router.post('/api/articles', 'articles-get', ArticleController.get())
    router.post('/api/articles/add', 'articles-add', ArticleController.add())
    return Router.all();
  }

  static checkRoutes(request: Request) {
    const METHOD = request.method
    const URL = request.url
    const filterRoute = Router.routes.filter((route: any) => (route.method == METHOD && route.url == URL))
    if (filterRoute && filterRoute.length > 0) {
      return filterRoute[0].callback();
    } else {
      return Router.routes.find(elem => elem.url === "/404")?.callback()
    }
  }
}