import { AbstractModel } from "./abstract.model";
import { iCommentaire } from "./interface/commentaire.interface";
export class Commentaire extends AbstractModel {
  public overwriteTypes(): object {
    return {
      id: 'number',
    };
  }

  constructor(fields: Array<iCommentaire> = null) {
    super('commentaire', fields)
  }

}