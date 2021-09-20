import { Theme } from "../../core/database/model/theme.model";
import { MyTheme } from "../../core/viewer/theme";

export class ThemeController {
  public static async select(request: any) {
    await MyTheme.resetTheme();

    const { data } = request;
    const id = data.params;
    let theme = await new Theme().find(id);
    let update;

    if (theme[0].choice == 0) {
      update = await new Theme().update({ choice: 1 }, theme[0].id);
    }

    return theme;

  }

}