const themes = document.querySelector('.themes');

async function getThemes() {
  try {

    let response = await fetch("http://localhost:3000/api/themes", {
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

getThemes().then(_themes => {
  if (_themes.length > 0) {
    _themes.forEach(theme => {
      createThemeContent(theme);
    });
  }

})

//CONFIG
function createThemeContent(theme) {
  let card = document.createElement('div');
  card.classList.add('_card');
  let box = document.createElement('div');
  box.classList.add('box')
  let content = document.createElement('div');
  content.classList.add('content');
  let title = document.createElement('h3');
  title.innerHTML = 'theme ' + theme.name;

  content.appendChild(title);

  if (theme.choice == 0) {
    let active = document.createElement('button');
    active.classList.add('btn')
    active.addEventListener('click', function () {
      activeTheme(theme.id);
    })
    active.innerHTML = 'activer';
    content.appendChild(active);


  } else {
    box.classList.add('choice');
  }

  box.appendChild(content);
  card.appendChild(box);
  themes.appendChild(card);
}

function activeTheme(id) {
  console.log("http://localhost:3000/api/theme/select/" + id);
  fetch("http://localhost:3000/api/theme/select/" + id, {
    method: 'get',
    mode: 'cors',
    cache: 'default'
  })
    .then(response => response.json())
    .then(response => location.reload())
    .catch(error => console.log("Erreur : " + error));
}