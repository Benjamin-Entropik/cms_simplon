let class_article = document.querySelector('.article');
let class_header = document.querySelector('.header');
let class_commentaire = document.querySelector('.commentaire');
let form_Commentaire = document.querySelector('.form-commentaire');

let url = window.location.pathname;
let parse = url.split('/').slice(1);
const idArticle = parseInt(parse[1]);

let btnComment = document.getElementById('btn-comment');
btnComment.addEventListener('click', function () {
  addCommentaire(idArticle);
});
getArticle(idArticle).then(_article => {
  if (_article.length == 0) {
    articleNotFound();
  } else {
    createArticleContent(_article[0])
  }
})

getCommentaires(idArticle).then(_commentaires => {
  if (_commentaires.length > 0) {
    _commentaires.forEach(commentaire => {
      createCommentaireContent(commentaire)
    })
  }
});

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
  form_Commentaire.style.display = 'none';
  class_commentaire.style.display = 'none';
  let notArticle = document.createElement('h4');
  notArticle.classList.add('mt-4')
  notArticle.innerHTML = 'Article non trouvé'
  class_article.appendChild(notArticle);
}

function createArticleContent(article) {
  let title = document.createElement('h1');
  let content = document.createElement('p');

  title.innerHTML = article.title;
  content.innerHTML = article.content;

  class_header.appendChild(title);
  class_article.appendChild(content);
}

function createCommentaireContent(commentaire) {

  let card = document.createElement('div');
  card.classList.add("card");
  let cardBody = document.createElement('div');
  cardBody.classList.add("card-body");
  let title = document.createElement('h5');
  title.classList.add("card-title");
  let content = document.createElement('p');
  content.classList.add("card-text");

  title.innerHTML = 'nom : ' + commentaire.name;
  content.innerHTML = commentaire.content;

  cardBody.appendChild(title);
  cardBody.appendChild(content);
  card.appendChild(cardBody);
  class_commentaire.appendChild(card)

}

async function getCommentaires(id) {
  try {

    let response = await fetch("http://localhost:3000/api/article/commentaires/" + id, {
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

async function addCommentaire(id) {
  let name = document.getElementById('name');
  let content = document.getElementById('content');
  const commentaire = {
    name: name.value,
    content: content.value,
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

}