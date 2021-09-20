import { Theme } from '../database/model/theme.model';

export class MyTheme {
  public static async resetTheme() {
    let themes = await new Theme().findAll();
    themes.forEach(async (_theme) => {
      if (_theme.choice == '1') {
        await new Theme().update({ choice: 0 }, _theme.id);
      }
    });
  }

  public static async getTheme() {
    const themes = await new Theme().findAll({ choice: 1 });
    const theme = themes[0].name;
    return theme;
  }
}