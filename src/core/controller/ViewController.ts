import { Viewer } from '../viewer/viewer';

export class ViewController {
  public static home() {
    return Viewer.make('home.ejs');
  }
  public static about() {
    return Viewer.make('about.ejs');
  }
  public static contact() {
    return Viewer.make('contact.ejs');
  }
  public static articles() {
    return Viewer.make('articles.ejs');
  }
  public static notFound() {
    return Viewer.make('notFound.ejs');
  }
}