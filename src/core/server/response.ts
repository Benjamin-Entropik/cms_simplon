import { Viewer } from "../viewer/viewer";
import { ServerResponse } from "http";

export class Response {
  public response: ServerResponse;

  constructor(response: ServerResponse) {
    this.response = response;
  }


  async responseHandler(data: any) {
    if (data instanceof Viewer) {
      const _data = await data.display();
      this.response.writeHead(200, { "Content-Type": "text/html" })
      return this.response.end(_data)
    } else {
      this.response.writeHead(200, { "Content-Type": "application/json" })
      return this.response.end(JSON.stringify(data));

    }

  }
}