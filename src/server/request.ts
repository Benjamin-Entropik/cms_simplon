import { IncomingMessage } from "http";
export class Request {
  public method: any;
  public url: any;

  constructor(request: IncomingMessage) {
    this.method = request.method;
    this.url = request.url;
  }

}