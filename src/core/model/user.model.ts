import { AbstractModel } from "./abstract.model";
import { iUser } from "./interface/user.interface";
export class User extends AbstractModel {
  public overwriteTypes(): object {
    return {
      id: 'number',
    };
  }

  constructor(fields: Array<iUser> = null) {
    super('user', fields)
  }

}