import * as fs from 'fs';
import * as ejs from 'ejs';

export class Viewer {
  dirPath: string = 'src/theme/views/';
  private static _instance: Viewer;
  public filename: string;
  public cssFileName?: string;
  public jsFileName?: string;
  public data: any;

  constructor(filename: string, data: any = null) {
    Viewer._instance = this;
    this.filename = filename + '.ejs';
    this.cssFileName = filename + '.css';
    this.jsFileName = filename + '.js';
    this.data = data;
  }

  public static make(filename: string, data: any = null) {
    Viewer._instance = new Viewer(filename, data);
    return Viewer._instance;
  }

  private getFile(filename: string): any {
    return fs.readFileSync(this.dirPath + filename, 'utf8');
  }

  private getCssFile() {
    if (this.cssFileName) {
      return {
        style: fs.readFileSync('src/assets/css/' + this.cssFileName, 'utf8')
      }
    } else {
      return {
        style: fs.readFileSync('src/assets/css/notFound.css', 'utf8')
      }
    }

  }

  private getJsScriptFile() {
    if (this.jsFileName) {
      return { js: fs.readFileSync('src/theme/views/js/' + this.jsFileName) }
    } else {
      return { js: fs.readFileSync('src/theme/views/js/notFound.js') }
    }

  }

  private getSideBarFile() {
    return {
      sideBar: fs.readFileSync('src/theme/views/partials/sideBar.ejs', 'utf8'),
      sideBarCss: fs.readFileSync('src/assets/css/partials/sideBar.css', 'utf8')
    }

  }

  public display() {

    const css = this.getCssFile()
    const script = this.getJsScriptFile();
    const partials = this.getSideBarFile()
    return ejs.render(this.getFile(this.filename), { filename: this.filename, data: this.data, css: css, script: script, partials: partials })
  }
}