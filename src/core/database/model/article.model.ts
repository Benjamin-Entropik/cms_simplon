import { AbstractModel } from "./abstract.model";
import { iField } from "./interface/field.interface";
import { Request } from '../../server/request'
export class Article extends AbstractModel {
  public name;
  public overwriteTypes(): object {
    return {
      id: 'number',
    };
  }

  constructor(fields: Array<iField> = null) {
    Request.data ? fields = Request.data : fields = null;
    super('article', fields)
  }

}