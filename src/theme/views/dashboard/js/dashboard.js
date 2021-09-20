const articles = document.getElementById('articles');
const apparence = document.getElementById('apparence');

articles.addEventListener("click", function () {
  const url = returnUrl + '/dashboard/articles';
  window.location.href = url;
})

// apparence.addEventListener("click", function () {
//   const url = returnUrl + '/dashboard';
//   window.location.href = url;
// })