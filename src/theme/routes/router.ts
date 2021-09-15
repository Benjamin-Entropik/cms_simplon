import { Route } from "./route";
import { Method } from "./route.enum";
import { iRoute } from "./route.interface";

export class Router {
  private static _instance: Router;
  public static routes: Array<iRoute> = [];

  private constructor() {
    Router._instance = this;
  }


  public static getInstance() {
    if (!Router._instance) Router._instance = new Router();
    return Router._instance;
  }

  get(url, name, callback) {

    let conf = {
      method: Method.GET,
      url: url,
      name: name,
      callback: (req, res) => { return !req ? callback : req; }
    };

    Router.createRoute(conf);
  }
  post(url, name, callback) {

    let conf = {
      method: Method.POST,
      url: url,
      name: name,
      callback: (req, res) => { 
        return !req ? callback : req; }
    };

    Router.createRoute(conf);
  }
  put(url, name, callback) {

    const conf = {
      method: Method.PUT,
      url: url,
      name: name,
      callback: callback,
    };

    Router.createRoute(conf);
  }
  delete(url, name, callback) {

    const conf = {
      method: Method.DELETE,
      url: url,
      name: name,
      callback: callback,
    };

    Router.createRoute(conf);
  }

  public static createRoute(conf: iRoute) {
    let route = new Route(conf.method, conf.url, conf.name, conf.callback);
    this.routes.push(route)
  }

  public static all() {
    return this.routes;
  }
}