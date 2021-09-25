import { Article } from "./tables/article";
import { Commentaire } from "./tables/commentaire";
import { Theme } from "./tables/theme";
import { User } from "./tables/user";
export class Migrate {

  public static make() {
    Article.createTable();
    Commentaire.createTable();
    Theme.createSeeder();
    User.createTable();
    User.createSeeder();
    console.log('création des tables avec succès')
  }
}

Migrate.make();