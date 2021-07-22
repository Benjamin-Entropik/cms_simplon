import * as http from 'http';
import { Database } from './database/database';

import { Routes } from './routes/routes';
import { Request } from './server/request';
import { Response } from './server/response';

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

  private startServer(port) {
    const server = http.createServer((req, res) => {
      
      const request = new Request(req);
      const response = new Response(res);
      response.responseHandler(Routes.checkRoutes(request))
    });
    ServerSingleton.listen(server, port)
    console.log('server open');

  }

  public static listen(server, port: number): void {
    server.listen(port);
  }

}