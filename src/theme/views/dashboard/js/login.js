const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');
const returnUrl = window.location.protocol + "//" + window.location.host;


function goSite() {
  window.location.href = returnUrl + '/';
}

function login() {

  const login_value = {
    email: email.value,
    password: password.value
  };
  fetch("http://localhost:3000/api/login", {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    mode: 'cors',
    body: JSON.stringify(login_value),
    cache: 'default'
  })
    .then(response => response.json())
    .then(response => {
      checkLogin(response.data);
    })
    .catch(error => console.log("Erreur : " + error));
}

function checkLogin(data) {
  console.log(data)
  console.log(data.status == 200)
  if (data.status == 200) {
    const returnUrl = window.location.protocol + "//" + window.location.host;
    const url = returnUrl + '/dashboard';

    window.location.href = url;
  } else {
    const content = document.createElement('p');
    content.innerHTML = data.message;
    message.appendChild(content);
  }


}