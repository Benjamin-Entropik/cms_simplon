import { Viewer } from '../../core/viewer/viewer';

export class ViewController {
  public static home() {
    return Viewer.make('home');
  }
  public static about() {
    return Viewer.make('about');
  }
  public static contact() {
    return Viewer.make('contact');
  }
  public static articles() {
    return Viewer.make('articles');
  }
  public static article() {
    return Viewer.make('article');
  }
  public static notFound() {
    return Viewer.make('notFound');
  }
}