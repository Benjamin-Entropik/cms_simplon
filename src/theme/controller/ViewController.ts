import { Viewer } from '../../core/viewer/viewer';

export class ViewController {
  public static home() {
    return Viewer.make('home');
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