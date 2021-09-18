import { iRoute } from "./route.interface";

export class Route implements iRoute {
  method: string;
  url: string;
  name: string;
  callback: any;
  regexp: any;

  constructor(method: string, url: string, name: string, callback: any, regexp?: any) {
  this.method = method;
  this.url = url;
  this.name = name;
  this.callback = callback;
  this.regexp = ":" + url.split(':')[1];
}

}