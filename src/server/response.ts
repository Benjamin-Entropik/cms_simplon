import { Viewer } from "../viewer/viewer";
import {ServerResponse} from "http";

export class Response {
  public response: ServerResponse;
  
  constructor(response: ServerResponse) {
    this.response = response;
  }


  responseHandler(data: any) {
    if (data instanceof Viewer) {
      this.response.writeHead(200, { "Content-Type": "text/html" })
      return this.response.end(data.display())
    } else {
      this.response.writeHead(200, { "Content-Type": "application/json" })
      return this.response.end(JSON.stringify(data));
    }
  }
}