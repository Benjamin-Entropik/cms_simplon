export class CommentaireResource {
  public static format(commentaire) {
    return {
      id: commentaire.id,
      name: commentaire.name,
      content: commentaire.content
    }
  }
}