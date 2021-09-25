import * as http from 'http';

import { Request } from '../server/request';
import { Response } from '../server/response';
import { Viewer } from '../viewer/viewer';
import { Router } from '../routes/router';
import url from "url";
import { AuthService } from '../../../config/auth.service';
import { Middleware } from '../../../config/middleware';
export class ServerSingleton {

  private static _instance: ServerSingleton = new ServerSingleton();
  constructor() {
    ServerSingleton._instance = this;
  }

  public static getInstance(): ServerSingleton {
    if (!this._instance) this._instance = new ServerSingleton();
    return this._instance;
  }

  public static start() {
    this.getInstance().startServer(process.env.NODE_LOCAL_PORT);
  }
  private getParams(path: any) {
    return path?.slice(1)[path.length - 2];
  }

  private async check(response: any, request: Request) {
    let baseURI = url.parse(request.url, true);
    let path = baseURI.pathname?.split('/');
    let params = this.getParams(path);


    let findRoute = Router.all().filter((route: any) => (route.method == request.method && route.url == request.url || route.url.match(route.regexp, params) && route.url.replace(route.regexp, params) == baseURI.path));

    if (findRoute && findRoute.length > 0) {
      if (typeof findRoute[0].callback === "function") {

        const data = await findRoute[0].callback(request);
        if (data) {
          if (data instanceof Viewer) {
            (await Middleware).check(response, data);

          } else if (data.view) {
            const viewContent = Viewer.make(data.view, data.payload);
            response.responseHandler(viewContent)
          } else {
            let returningData;
            if (!data.payload) returningData = { data }

            else returningData = data.payload

            response.responseHandler(returningData);
          }
        }
      }
    } else {
      const viewContent = Viewer.make("notFound");
      response.responseHandler(viewContent)
    }

  }
  private startServer(port) {

    const server = http.createServer(async (req, res) => {
      const request = new Request(req);
      const response = new Response(res);
      await request.setData();

      this.check(response, request);

    });

    ServerSingleton.listen(server, port)
    console.log('server open');

  }

  public static listen(server, port: number): void {
    server.listen(port);
  }

}