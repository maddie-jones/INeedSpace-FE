const favIndex= 'https://enigmatic-ocean-44786.herokuapp.com/api/v1/favorites'

function getFavorite() {
  fetch(favIndex)
  .then(response => response.json())
  .then(data => renderFavorite(data));
}

function renderFavorite(data) {
  favorites = data["data"]
  for (let favorite of favorites) {
    let media_type = favorite["attributes"].media_type
    if (media_type == "video") {
      let url = favorite["attributes"].url
      video = document.createElement('iframe');
      video.src = url;
      video.className = 'video';
      document.getElementById("favorites").appendChild(video);
    } else if (media_type == "image") {
      var url = favorite["attributes"].url
      image = document.createElement('img');
      image.src = url;
      image.className = 'image';
      document.getElementById("favorites").appendChild(image);
    };
    let imageTitle = favorite["attributes"].title
    title = document.createElement('p');
    title.innerHTML = imageTitle;
    title.className = 'image-title';
    document.getElementById("favorites").appendChild(title);

    let imageExplanation = favorite["attributes"].explanation
    explanation = document.createElement('p');
    explanation.innerHTML = imageExplanation;
    explanation.className = 'image-explanation';
    document.getElementById("favorites").appendChild(explanation);

    deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "delete favorite" ;
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click',function() {
       removeFromFavorites(data)});
    document.getElementById("favorites").appendChild(deleteBtn);
  }
}

getFavorite()
