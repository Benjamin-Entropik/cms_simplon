const articles = document.getElementById('articles');
const themes = document.getElementById('themes');

articles.addEventListener("click", function () {
  const url = returnUrl + '/dashboard/articles';
  window.location.href = url;
})

themes.addEventListener("click", function () {
  const url = returnUrl + '/dashboard/themes';
  window.location.href = url;
})