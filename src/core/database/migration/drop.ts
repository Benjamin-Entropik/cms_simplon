import { Article } from "./tables/article";
import { Commentaire } from "./tables/commentaire";
import { Theme } from "./tables/theme";
import { User } from "./tables/user";

export class Drop {
  public static make() {
    Commentaire.drop();
    Article.drop();
    Theme.drop();
    User.drop();
    console.log('Toutes les tables ont étés supprimés')
  }
}

Drop.make();