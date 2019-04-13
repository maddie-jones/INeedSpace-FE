const apodUrl= 'http://localhost:3000/api/v1/apod?api_key=jdCci90zMTb076TOrfTGriiH1nCEcLqJGNUXhRHP'

function imageOfTheDay() {
  fetch(apodUrl)
  .then(response => response.json())
  .then(data => renderImage(data));
}

function renderImage(data) {
  let url = data["data"]["attributes"].url
  let imageTitle = data["data"]["attributes"].title
  image = document.createElement('img');
  image.src = url;
  image.className = 'image';
  document.getElementById("day-image").appendChild(image);
  
  title = document.createElement('p');
  title.innerHTML = imageTitle;
  title.className = 'image-title';
  document.getElementById("day-image").appendChild(title);

  star = document.createElement('i');
  star.className = 'fas fa-star';
  document.getElementById("day-image").appendChild(star);
}


imageOfTheDay()
