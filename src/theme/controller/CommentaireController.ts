import { Commentaire } from "../../core/database/model/commentaire.model";
import { Request } from "../../core/server/request";

export class CommentaireController {
  public static async get(request: Request) {
    try {
      const { data } = request;
      const id = data.params;
      const commentaire = await new Commentaire().findAll({ article_id: id })
      return commentaire;
    } catch (error) {
      console.log('error in single article (html)', error)
    }
  }

  public static async add(request: any) {
    try {
      const { name, content, article_id } = request.data.body;

      const commentaire = await new Commentaire().add({ name, content, article_id });
      return commentaire;
    } catch (error) {
      console.log('error in post commentaire (api)', error)
    }

  }

  public static async delete(request: any) {
    try {
      const id = request.data.body;
      let commentaire = await new Commentaire().delete(id);
      return commentaire;

    } catch (error) {
      console.log('error in post article (api)', error)
    }
  }


}