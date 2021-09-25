import * as fs from 'fs';
import * as ejs from 'ejs';
import { MyTheme } from './theme';

export class Viewer {
  dirPath: string = 'src/theme/views/';
  cssDirPath: string = 'src/assets/css/' + Viewer.theme + '/';
  jsDirPath: string = 'src/theme/views/js/';
  private static _instance: Viewer;
  public filename: any;
  public cssFileName?: string;
  public jsFileName?: string;
  public data: any;
  public static theme: string = 'standard';

  constructor(file: any, data: any = null) {

    Viewer._instance = this;
    if (typeof file == 'object') {
      this.buildPathDashboard(file);
    } else if (typeof file == 'string') {
      this.buildPathTheme(file);
    }
    this.data = data;

  }

  private buildPathDashboard(file: any) {
    this.dirPath = file.dirPath;
    this.cssDirPath = 'src/assets/css/dashboard/';
    this.jsDirPath = 'src/theme/views/dashboard/js/';
    this.filename = file.filename + '.ejs';
    this.cssFileName = file.filename + '.css';
    this.jsFileName = file.filename + '.js';
  }

  private buildPathTheme(file: string) {
    this.filename = file + '.ejs';
    this.cssFileName = file + '.css';
    this.jsFileName = file + '.js';
  }


  public static make(filename: any, data: any = null) {

    Viewer._instance = new Viewer(filename, data);
    return Viewer._instance;
  }



  private getFile(filename: string): any {
    return fs.readFileSync(this.dirPath + filename, 'utf8');
  }

  private async getCssFile() {
    Viewer.theme = await MyTheme.getTheme()
    if (this.cssFileName) {
      return {
        style: await fs.readFileSync(this.cssDirPath + this.cssFileName, 'utf8')
      }
    } else {
      return {
        style: await fs.readFileSync('src/assets/css/notFound.css', 'utf8')
      }
    }

  }

  private getJsScriptFile() {
    if (this.jsFileName) {
      return { js: fs.readFileSync(this.jsDirPath + this.jsFileName) }
    } else {
      return { js: fs.readFileSync('src/theme/views/js/notFound.js') }
    }

  }

  private getSideBarFile() {
    return {
      sideBar: fs.readFileSync('src/theme/views/partials/sideBar.ejs', 'utf8'),
      sideBarCss: fs.readFileSync('src/assets/css/partials/sideBar.css', 'utf8'),
      navBar: fs.readFileSync('src/theme/views/partials/navBar.ejs', 'utf8'),
      navBarCss: fs.readFileSync('src/assets/css/' + Viewer.theme + '/navBar.css', 'utf8'),

    }

  }


  public async display() {

    const css = await this.getCssFile()
    const script = this.getJsScriptFile();
    const partials = this.getSideBarFile();
    return ejs.render(this.getFile(this.filename), { filename: this.filename, data: this.data, css: css, script: script, partials: partials })
  }
}