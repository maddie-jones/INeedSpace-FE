const favIndex= 'https://enigmatic-ocean-44786.herokuapp.com/api/v1/favorites'

function getFavorite() {
  fetch(favIndex)
  .then(response => response.json())
  .then(data => renderFavorite(data));
}

function renderFavorite(data) {
  favorites = data["data"]
  for (let favorite of favorites) {
    let id = favorite.id
    let media_type = favorite["attributes"].media_type
    container = document.createElement('section');
    container.id = `fav-container-${id}`;
    container.className = `fav-container`;
    document.getElementById("favorites").appendChild(container)
    if (media_type == "video") {
      let url = favorite["attributes"].url
      video = document.createElement('iframe');
      video.src = url;
      video.className = 'fav-video';
      document.getElementById(`fav-container-${id}`).appendChild(video);
    } else if (media_type == "image") {
      var url = favorite["attributes"].url
      image = document.createElement('img');
      image.src = url;
      image.className = 'fav-image';
      document.getElementById(`fav-container-${id}`).appendChild(image);
    };
    let imageTitle = favorite["attributes"].title
    title = document.createElement('p');
    title.innerHTML = imageTitle;
    title.className = 'fav-title';
    document.getElementById(`fav-container-${id}`).appendChild(title);

    let imageExplanation = favorite["attributes"].explanation
    explanation = document.createElement('p');
    explanation.innerHTML = imageExplanation;
    explanation.className = 'fav-explanation';
    document.getElementById(`fav-container-${id}`).appendChild(explanation);

    deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "delete favorite" ;
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click',function() {
       removeFromFavorites(data)});
    document.getElementById(`fav-container-${id}`).appendChild(deleteBtn);
  }
}

getFavorite()
