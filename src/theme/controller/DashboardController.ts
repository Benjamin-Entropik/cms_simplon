import { Viewer } from "../../core/viewer/viewer";

export class DashboardController {
  public static view() {
    const file = {
      dirPath: 'src/theme/views/dashboard/',
      filename: 'dashboard'
    }
    return Viewer.make(file);
  }
  public static viewArticles() {
    const file = {
      dirPath: 'src/theme/views/dashboard/',
      filename: 'articles'
    }
    return Viewer.make(file);
  }

  public static viewArticle() {
    const file = {
      dirPath: 'src/theme/views/dashboard/',
      filename: 'article'
    }
    return Viewer.make(file);
  }
}