import { Article } from "./article";
import { Commentaire } from "./commentaire";

export class Migrate {
  public static make() {
    Article.createTable();
    Commentaire.createTable();
  } 
}

Migrate.make();