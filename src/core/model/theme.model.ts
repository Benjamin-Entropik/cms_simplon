import { AbstractModel } from "./abstract.model";
import { iTheme} from "./interface/theme.interface";
export class Theme extends AbstractModel {
  public overwriteTypes(): object {
    return {
      id: 'number',
    };
  }

  constructor(fields: Array<iTheme> = null) {
    super('theme', fields)
  }

}