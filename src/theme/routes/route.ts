import { iRoute } from "./route.interface";

export class Route implements iRoute {
  method: string;
  url: string;
  name: string;
  callback: any;

  constructor(method: string,url: string, name: string, callback: any) {
    this.method = method;
    this.url = url;
    this.name = name;
    this.callback = callback;
  }

}