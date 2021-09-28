let class_article = document.querySelector('._article');
let class_header = document.querySelector('.header');
let class_commentaire = document.querySelector('.commentaire');
let title_commentaire_not_found = document.createElement('h5');
let title_input = document.getElementById('title_input');
let content = document.getElementById('content');
let update = document.getElementById('update');
let btn_go_article = document.getElementById('go-article');
let btn_delete_article = document.getElementById('delete-article');

let url = window.location.pathname;
let parse = url.split('/').slice(1);
const idArticle = parseInt(parse[2]);

btn_delete_article.addEventListener('click', function () {
  let body = document.querySelector('body');
  if (document.querySelector('.delete') == null) {
    const elements = createElementDeleteSnackbar();
    elements.cancel.addEventListener('click', function () {
      elements.card.remove();
    })
    elements.del.addEventListener('click', function () {
      deleteArticle();
    })
    elements.card_footer.appendChild(elements.cancel);
    elements.card_footer.appendChild(elements.del);

    elements.card.appendChild(elements.title);
    elements.card.appendChild(elements.card_footer);
    body.appendChild(elements.card);
  }

})

function createElementDeleteSnackbar() {
  let card = document.createElement('div');
  card.classList.add('delete');
  let title = document.createElement('h3');
  let card_footer = document.createElement('div');
  card_footer.classList.add('delete-footer');
  let cancel = document.createElement('button');
  cancel.classList.add('btn')
  let del = document.createElement('button');
  del.classList.add('btn')
  cancel.innerHTML = 'Annuler'
  del.innerHTML = 'Valider'
  title.innerHTML = 'Voulez vous supprimer l\'article ?';


  return { card, title, card_footer, cancel, del }

}

btn_go_article.addEventListener('click', function () {
  const returnUrl = window.location.protocol + "//" + window.location.host;
  const url = returnUrl + '/article/' + idArticle;

  window.location.href = url;
})

update.addEventListener('click', function () {
  updateArticle();
  location.reload();
})

function deleteArticle() {
  fetch("http://localhost:3000/api/articles/delete", {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    mode: 'cors',
    body: JSON.stringify(idArticle),
    cache: 'default'
  })
    .then(response => response.json())
    .then(response => {
      const returnUrl = window.location.protocol + "//" + window.location.host;
      const url = returnUrl + '/dashboard/articles';

      window.location.href = url;
    })
    .catch(error => console.log("Erreur : " + error));
}

getArticle(idArticle).then(_article => {
  if (Object.keys(_article).length === 0) {
    articleNotFound();
  } else {
    getArticleContent(_article)

    if (_article.commentaires.length > 0) {
      _article.commentaires.forEach(commentaire => {
        createCommentaireContent(commentaire)
      })
    } else {
      commentaireNotFound()
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

async function updateArticle() {
  const article = {
    title: title_input.value,
    content_article: content.value,
    id: idArticle
  };
  fetch("http://localhost:3000/api/articles/update", {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    mode: 'cors',
    body: JSON.stringify(article),
    cache: 'default'
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log("Erreur : " + error));

}

async function deleteCommentaire(id) {
  try {

    let response = await fetch("http://localhost:3000/api/commentaires/delete", {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
      body: JSON.stringify(id),
      cache: 'default'
    })
    response = await response.json();
    const article = await response.data;
    if (article.affectedRows == true) {
      let deleted_commentaire = document.getElementById('card ' + id)
      deleted_commentaire.remove();
      let allCommentaire = document.querySelectorAll('.commentaire-card')
      allCommentaire.length == 0 ? commentaireNotFound() : console.log(allCommentaire);
    }
    return article;

  } catch (error) {
    console.log(error);
  }
}

//CONFIG DOM

function getArticleContent(article) {
  let title_header = document.createElement('h1');
  title_header.innerHTML = article.title.replace("&glmt&", "'");;
  title_input.value = article.title.replace("&glmt&", "'");
  title_input.placeholder = article.title.replace("&glmt&", "'");;
  content.innerHTML = article.content_article.replace("&glmt&", "'");;
  class_header.appendChild(title_header);


}

function createCommentaireContent(commentaire) {
  title_commentaire_not_found.remove();
  let card = document.createElement('div');
  let cardBody = document.createElement('div');
  let title = document.createElement('h5');
  let content = document.createElement('p');
  let delete_btn = document.createElement('button');
  updateElementsCommentaireClass(card, cardBody, title, content, commentaire.id);
  updateDeleteCommentaireBtn(delete_btn, commentaire.id);
  title.innerHTML = 'nom : ' + commentaire.name.replace("&glmt&", "'");;
  content.innerHTML = commentaire.content.replace("&glmt&", "'");;

  cardBody.appendChild(title);
  cardBody.appendChild(content);
  cardBody.appendChild(delete_btn);
  card.appendChild(cardBody);
  class_commentaire.appendChild(card)

}

function updateElementsCommentaireClass(card, cardBody, title, content, id) {
  card.classList.add("card");
  card.classList.add("commentaire-card");
  card.id = "card " + id;
  cardBody.classList.add("card-body");
  title.classList.add("card-title");
  content.classList.add("card-text");

}

function updateDeleteCommentaireBtn(delete_btn, id) {
  delete_btn.classList.add("btn");
  delete_btn.classList.add("rounded");
  delete_btn.classList.add("delete-btn");

  delete_btn.innerHTML = 'Supprimer';

  delete_btn.addEventListener('click', function () {
    deleteCommentaire(id);
  })
}

function commentaireNotFound() {
  title_commentaire_not_found.classList.add("commentaire-not-found");
  title_commentaire_not_found.innerHTML = 'Il n\'y a pas encore de commentaire'
  class_commentaire.appendChild(title_commentaire_not_found)
}


function articleNotFound() {

  let title_Commentaire = document.querySelector('.title-commentaires');
  btn_go_article.remove();
  btn_delete_article.remove();
  class_article.remove();
  title_Commentaire.remove();
  class_commentaire.remove();
  let title_header = document.createElement('h1');
  title_header.innerHTML = 'Article innexistant';
  title_header.style.color = 'gray'
  class_header.appendChild(title_header);

}