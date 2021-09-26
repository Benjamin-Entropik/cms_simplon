export class ArticleResource {
  public static format(article, id) {
    return  {
      id: id,
      title: article.title,
      content_article: article.content_article
    }
  }
}