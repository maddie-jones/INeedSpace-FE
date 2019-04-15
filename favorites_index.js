const favIndex= 'https://enigmatic-ocean-44786.herokuapp.com/api/v1/favorites'

function getFavorite() {
  fetch(favIndex)
  .then(response => response.json())
  .then(data => renderFavorite(data));
}

function renderFavorite(data) {
  console.log(data)
}

getFavorite()
