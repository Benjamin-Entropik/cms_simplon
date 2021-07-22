import { Viewer } from '../viewer/viewer';

export class ViewController {
  public static home() {
    return Viewer.make('home.ejs', { data: 'page d\'accueil' });
  }
  public static about() {
    return Viewer.make('about.ejs');
  }
  public static contact() {
    return Viewer.make('contact.ejs');
  }
  public static notFound() {
    return Viewer.make('notFound.ejs');
  }
}