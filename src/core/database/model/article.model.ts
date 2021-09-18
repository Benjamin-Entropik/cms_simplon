import { AbstractModel } from "./abstract.model";
import { iArticle } from "./interface/article.interface";
export class Article extends AbstractModel {
  public overwriteTypes(): object {
    return {
      id: 'number',
    };
  }

  constructor(fields: Array<iArticle> = null) {
    super('article', fields)
  }

}