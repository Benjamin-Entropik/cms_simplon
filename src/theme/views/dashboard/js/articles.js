let publish = document.getElementById('add-article');
let articles_container = document.querySelector('.articles');


function createArticleContent(article) {
  let bloc = document.createElement('div');
  let title = document.createElement('h4');
  title.innerHTML = article.title;
  bloc.appendChild(title);
  articles_container.appendChild(bloc);

  goPageArticle(bloc, article)

}

function goPageArticle(btn, article) {
  const returnUrl = window.location.protocol + "//" + window.location.host;
  const url = returnUrl + '/dashboard/article/' + article.id;

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

getArticles().then(_articles => {
  if (_articles.length > 0) {
    _articles.forEach(article => {
      createArticleContent(article);
    });
  }

})

function addArticle() {
  let title = document.getElementById('titleArticle');
  let content = document.getElementById('contentArticle');
  const article = {
    title: title.value.replace("'", "&glmt&"),
    content_article: content.value.replace("'", "&glmt&")
  };

  fetch("http://localhost:3000/api/articles/add", {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    mode: 'cors',
    body: JSON.stringify(article),
    cache: 'default'
  })
    .then(response => response.json())
    .then(response => {
      article['id'] = response.data.insertId
      createArticleContent(article)
    })
    .catch(error => console.log("Erreur : " + error));
  title.value = '';
  content.value = '';
  modal.style.display = "none";
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("modal-add-article");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}