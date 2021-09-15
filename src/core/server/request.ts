import { IncomingMessage } from "http";

export class Request {
  public method: any;
  public url: any;
  public static data?: any;
  public static _instance: Request;

  constructor(request: IncomingMessage) {
    this.method = request.method;
    this.url = request.url;
    Request._instance = this;

  }

  public static getInstance(request: IncomingMessage) {
    if (!this._instance) Request._instance = new Request(request);
    console.log(Request._instance);
    return Request._instance;
  }
  requestOptions() {
    // if (this.request.method == 'POST') {
    //   let data: any = []
    //   this.request
    //     .on("data", d => {
    //       data.push(d)
    //     })
    //     .on("end", () => {
    //       data = JSON.parse(Buffer.concat(data).toString())
    //     })
    // }

  };

}