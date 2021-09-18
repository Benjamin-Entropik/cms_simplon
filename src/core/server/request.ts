import { IncomingMessage } from "http";
import { Method } from "../routes/route.enum";
import url from "url";

export class Request {
  public method: any;
  public url: any;
  public request: any;
  public data: any;

  constructor(request: IncomingMessage) {
    this.method = request.method;
    this.url = request.url;
    this.request = request;
    this.setData();
  }

  private parseUrlEncoded(_data: any) {
    let dataSplited = _data.split('&')
    let dataObject: any = new Object();
    dataSplited.forEach((data: any) => {
      let tab = data.split('=');
      let key = tab[0];
      let value = tab[1];
      dataObject[key] = value
    })
    return dataObject;
  }

  private parseBody() {
    let body: Array<any> = [];
    return new Promise((resolve, reject) => {
        this.request.on('data', (chunk: any) => {
            body.push(chunk)
        }).on('end', () => {
            let headerType = this.request.headers['content-type'];
            const parsedBody = Buffer.concat(body).toString();
            if(headerType == "application/json") return resolve(JSON.parse(parsedBody))
            if(headerType == "application/x-www-form-urlencoded") return resolve(this.parseUrlEncoded(parsedBody))
            else return resolve(parsedBody)
        });
    })
}

  public async setData() {
    let baseURI = url.parse(this.url, true);
    let path = baseURI.pathname?.split('/');
    let params = path?.slice(1)[path.length - 2];
    let query = baseURI.query;
    let body: any;

    switch (this.method) {
      case Method.GET:
        this.data = { params, query }
        break;
      case Method.POST:
        body = await this.parseBody();
        this.data = { body }
        break;
      case Method.PUT:
        body = await this.parseBody();
        this.data = { params, body }
        break;
      case Method.DELETE:
        this.data = { params }
        break;
      default:
        break;
    }
  }

}