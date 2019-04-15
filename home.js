const apodUrl= 'https://enigmatic-ocean-44786.herokuapp.com/api/v1/apod?api_key=jdCci90zMTb076TOrfTGriiH1nCEcLqJGNUXhRHP'
const postFavUrl= 'https://enigmatic-ocean-44786.herokuapp.com/api/v1/favorites'

function imageOfTheDay() {
  fetch(apodUrl)
  .then(response => response.json())
  .then(data => renderImage(data));
}

function renderImage(data) {
  let url = data["data"]["attributes"].url
  video = document.createElement('iframe');
  video.src = url;
  video.className = 'video';
  document.getElementById("day-image").appendChild(video);

  let imageTitle = data["data"]["attributes"].title
  title = document.createElement('p');
  title.innerHTML = imageTitle;
  title.className = 'image-title';
  document.getElementById("day-image").appendChild(title);

  const starHTML = `<i class="fas fa-star" id= "fav"></i>`;
  starBtn = document.createElement('button');
  starBtn.innerHTML = starHTML;
  starBtn.setAttribute('class', 'star-favorite');
  starBtn.addEventListener('click',function() {
     addToFavorites(data)});
  document.getElementById("day-image").appendChild(starBtn);
}

function addToFavorites(data) {
  const title = data["data"]["attributes"].title
  const url = data["data"]["attributes"].url
  const hdurl = data["data"]["attributes"].hdurl
  const explanation = data["data"]["attributes"].explanation
  postFavorite(title, url, hdurl, explanation)
}

function postFavorite(title, url, hdurl, explanation) {
  const data = {
    title: title,
    url: url,
    hdurl: hdurl,
    explanation: explanation
  }
  fetch(postFavUrl, {
    method: 'post',
    headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data),
  });
}

imageOfTheDay()
