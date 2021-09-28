let class_articles = document.getElementsByClassName('articles')[0];


getArticles().then(_articles => {
  if (_articles.length > 0) {
    _articles.forEach(article => {
      createArticleContent(article);
    });
  }

})

function createArticleContent(article) {
  let article_card = document.createElement('div');
  article_card.classList.add('article');
  let article_content = document.createElement('div');
  article_content.classList.add('container__text');
  let title = document.createElement('h1');
  let content = document.createElement('p');
  let btn_article = document.createElement('button');
  btn_article.classList.add('btn');

  title.innerHTML = article.title;
  content.innerHTML = article.content_article;
  btn_article.innerHTML = 'Voir l\'article'
  article_content.appendChild(title);
  article_content.appendChild(content);
  article_content.appendChild(btn_article);
  article_card.appendChild(article_content);
  class_articles.appendChild(article_card);

  goPageArticle(btn_article, article)
}


function goPageArticle(btn, article) {
  const returnUrl = window.location.protocol + "//" + window.location.host;
  const url = returnUrl + '/article/' + article.id;

  btn.addEventListener('click', function () {
    window.location.href = url;
  })
}
async function getArticles() {
  try {
    let response = await fetch("http://localhost:3000/api/articles", {
      method: 'get',
      mode: 'cors',
      cache: 'default'
    })
    response = await response.json();
    const articles = await response.data;
    return articles;

  } catch (error) {
    console.log(error);
  }
}
