import { AbstractModel } from "./abstract.model";
import { iField } from "./interface/field.interface";
import { iModel } from "./interface/model.interface";
import { Query } from "./query";

export class Article extends AbstractModel implements iModel {
  public overwriteTypes(): object {
    return {
      id: 'number',
    };
  }

  constructor(
    public fields: Array<iField>,
    public type: string = '',
  ) {
    super();
  }
}