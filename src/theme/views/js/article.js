let class_article = document.querySelector('.article');
let class_header = document.querySelector('.header');
let class_commentaire = document.querySelector('.commentaire');
let form_Commentaire = document.querySelector('.form-commentaire');
let title_commentaire_not_found = document.createElement('h5');

let url = window.location.pathname;
let parse = url.split('/').slice(1);
const idArticle = parseInt(parse[1]);

let btnComment = document.getElementById('btn-comment');
btnComment.addEventListener('click', function () {
  addCommentaire(idArticle);
});

getArticle(idArticle).then(_article => {
  if (!_article) {
    articleNotFound();
  } else {
    createArticleContent(_article)
    if (_article.commentaires.length > 0) {
      _article.commentaires.forEach(commentaire => {
        createCommentaireContent(commentaire)
      })
    } else {
      title_commentaire_not_found.classList.add("commentaire-not-found");
      title_commentaire_not_found.innerHTML = 'Il n\'y a pas encore de commentaire'
      class_commentaire.appendChild(title_commentaire_not_found)
    }
  }
})


async function getArticle(id) {
  try {

    let response = await fetch("http://localhost:3000/api/article/" + id, {
      method: 'get',
      mode: 'cors',
      cache: 'default'
    })
    response = await response.json();
    const article = await response.data;
    return article;

  } catch (error) {
    console.log(error);
  }
}

function articleNotFound() {
  let img_Article = document.querySelector('.img-article');
  let title_Commentaire = document.querySelector('.title-commentaires');
  img_Article.remove();
  title_Commentaire.remove();
  form_Commentaire.remove();
  class_commentaire.remove();
  let notArticle = document.createElement('h4');
  notArticle.classList.add('text-center')
  notArticle.innerHTML = 'Article non trouvé'
  class_article.appendChild(notArticle);
}

function createArticleContent(article) {
  let title = document.createElement('h1');
  let content = document.createElement('p');

  title.innerHTML = article.title.replace("&glmt&", "'");
  content.innerHTML = article.content_article.replace("&glmt&", "'");

  class_header.appendChild(title);
  class_article.appendChild(content);
}

function createCommentaireContent(commentaire) {
  title_commentaire_not_found.remove();
  let card = document.createElement('div');
  card.classList.add("card");
  let cardBody = document.createElement('div');
  cardBody.classList.add("card-body");
  let title = document.createElement('h5');
  title.classList.add("card-title");
  let content = document.createElement('p');
  content.classList.add("card-text");

  title.innerHTML = 'nom : ' + commentaire.name.replace("&glmt&", "'");
  content.innerHTML = commentaire.content.replace("&glmt&", "'");

  cardBody.appendChild(title);
  cardBody.appendChild(content);
  card.appendChild(cardBody);
  class_commentaire.appendChild(card)

}

async function addCommentaire(id) {
  let name = document.getElementById('name');
  let content = document.getElementById('content');
  const commentaire = {
    name: name.value.replace("'", "&glmt&"),
    content: content.value.replace("'", "&glmt&"),
    article_id: id
  };
  fetch("http://localhost:3000/api/commentaires/add", {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    mode: 'cors',
    body: JSON.stringify(commentaire),
    cache: 'default'
  })
    .then(response => response.json())
    .then(response => createCommentaireContent(commentaire))
    .catch(error => console.log("Erreur : " + error));

    name.value = '';
    content.value = '';

}