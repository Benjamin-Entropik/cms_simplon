import { Router } from "./router";
import { ViewController } from "../controller/ViewController";
import { Request } from "../server/request";
import { ArticleController } from "../controller/ArticleController";

export class Routes {
  static req: Request;
  static build() {
    const router = Router.getInstance();
    router.get('/', 'home', ViewController.home())
    router.get('/about', 'about', ViewController.about())
    router.get('/contact', 'contact', ViewController.contact())
    router.get('/404', 'not-found', ViewController.notFound())
    router.get('/articles', 'articles', ArticleController.get())
    return Router.all();
  }

  static checkRoutes(request: Request) {
    const METHOD = request.method
    const URL = request.url
    const filterRoute = Router.routes.filter((route: any) => (route.method == METHOD && route.url == URL))
    if (filterRoute && filterRoute.length > 0) {
      this.req = request;
      return filterRoute[0].callback;
    } else {
      return Router.routes.find(elem => elem.url === "/404")?.callback
    }
  }
}