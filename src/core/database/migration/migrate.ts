import { Article } from "./article";
import { Commentaire } from "./commentaire";
import { Theme } from "./theme";

export class Migrate {
  public static make() {
    Article.createTable();
    Commentaire.createTable();
    Theme.createTable();
  } 
}

Migrate.make();