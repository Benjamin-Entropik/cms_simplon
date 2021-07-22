import * as fs from 'fs';
import * as ejs from 'ejs';

export class Viewer {
  dirPath: string = 'src/views/';
  private static _instance: Viewer;
  public filename: string;
  public data: any;

  constructor(filename: string, data: any = null) {
    Viewer._instance = this;
    this.filename = filename;
    this.data = data;
  }

  public static make(filename: string, data: any = null) {
    Viewer._instance = new Viewer(filename, data);
    return Viewer._instance;
  }

  private getFile(filename: string): any {
    return fs.readFileSync(this.dirPath + filename, 'utf8');
  }

  public display() {
    return ejs.render(this.getFile(this.filename), { filename: this.filename, data: this.data })
  }
}