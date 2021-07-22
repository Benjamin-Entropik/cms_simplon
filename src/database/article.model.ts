import { AbstractModel } from "./abstract.model";

export class Article extends AbstractModel {
  public overwriteTypes(): object {
    return {
      id: 'number',
    };
  }

  constructor(
    public field: string = '',
    public address: string = '',
  ) {
    super();
  }
}