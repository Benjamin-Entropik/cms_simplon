import { Route } from "./route";
import { Method } from "./route.enum";
import { iRoute } from "./route.interface";

export class Router {
  private static _instance: Router;
  private routes: Array<iRoute> = [];

  private constructor() { }


  private static getInstance(): Router {
    if (!Router._instance) Router._instance = new Router();
    return Router._instance;
  }

  public static get(url, name, callback) {

    let conf = {
      method: Method.GET,
      url: url,
      name: name,
      callback: callback
    };

    Router.getInstance().createRoute(conf);
  }
  public static post(url, name, callback) {

    let conf = {
      method: Method.POST,
      url: url,
      name: name,
      callback: callback
    };

    Router.getInstance().createRoute(conf);
  }
  public static put(url, name, callback) {

    const conf = {
      method: Method.PUT,
      url: url,
      name: name,
      callback: callback,
    };

    Router.getInstance().createRoute(conf);
  }
  public static delete(url, name, callback) {

    const conf = {
      method: Method.DELETE,
      url: url,
      name: name,
      callback: callback,
    };

    Router.getInstance().createRoute(conf);
  }

  public createRoute(conf: iRoute) {
    let route = new Route(conf.method, conf.url, conf.name, conf.callback);
    this.routes.push(route)
  }

  public static all() {
    return this.getInstance().routes;
  }
}