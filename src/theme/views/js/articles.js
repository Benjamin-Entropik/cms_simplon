let class_articles = document.getElementsByClassName('articles')[0];

  let publish = document.getElementById('addArticle');
  publish.addEventListener('click', function () {
    addArticle();
  });

  getArticles().then(_articles => {
    if (_articles.length > 0) {
      _articles.forEach(article => {
        createArticleContent(article);
      });
    }

  })

  function createArticleContent(article) {

    let bloc = document.createElement('div');
    let title = document.createElement('h2');
    let content = document.createElement('p');
    title.innerHTML = article.title;
    content.innerHTML = article.content;
    bloc.appendChild(title);
    bloc.appendChild(content);
    class_articles.appendChild(bloc);

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

  function addArticle() {
    let title = document.getElementById('titleArticle');
    let content = document.getElementById('contentArticle');
    const article = {
      title: title.value,
      content: content.value
    };
    fetch("http://localhost:3000/api/articles/add", {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
      body: JSON.stringify(article),
      cache: 'default'
    })
      .then(response => response.json())
      .then(response => createArticleContent(article))
      .catch(error => console.log("Erreur : " + error));

    modal.style.display = "none";
  }

  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
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
