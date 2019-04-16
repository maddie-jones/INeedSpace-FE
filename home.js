const apodUrl= 'https://enigmatic-ocean-44786.herokuapp.com/api/v1/apod?api_key=jdCci90zMTb076TOrfTGriiH1nCEcLqJGNUXhRHP'
const postFavUrl= 'https://enigmatic-ocean-44786.herokuapp.com/api/v1/favorites'
const searchImageInput = document.getElementById("search-input")
const searchImageBtn = document.getElementById("search-image")

function imageOfTheDay() {
  fetch(apodUrl)
  .then(response => response.json())
  .then(data => renderImage(data));
}

function renderImage(data) {
  let media_type = data["data"]["attributes"].media_type
  if (media_type == "video") {
    let url = data["data"]["attributes"].url
    video = document.createElement('iframe');
    video.src = url;
    video.className = 'video';
    video.addEventListener('click',function() {
       addModal(url, media_type)});
    document.getElementById("day-image").appendChild(video);
  } else if (media_type == "image") {
    var url = data["data"]["attributes"].url
    image = document.createElement('img');
    image.src = url;
    image.className = 'image';
    image.addEventListener('click',function() {
       addModal(url, media_type)});
    document.getElementById("day-image").appendChild(image);
  };

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
  const media_type = data["data"]["attributes"].media_type
  postFavorite(title, url, hdurl, explanation, media_type)
}

function postFavorite(title, url, hdurl, explanation, media_type) {
  const data = {
    title: title,
    url: url,
    hdurl: hdurl,
    explanation: explanation,
    media_type: media_type
  }
  fetch(postFavUrl, {
    method: 'post',
    headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data),
  });
}

function getSearchImage() {
  var input = searchImageInput.value
  fetch(`https://enigmatic-ocean-44786.herokuapp.com/api/v1/imagesearch?q=${input}`)
  .then(response => response.json())
  .then(data => renderSearchImage(data))
  .catch(err => console.error(err))
}

function renderSearchImage(data) {
  const rawData = data.data
  for (let image in rawData) {
    let url = rawData[image]["attributes"]["href"]
    searchImage = document.createElement('img');
    searchImage.src = url;
    searchImage.className = 'search-image';
    document.getElementById("search-display").appendChild(searchImage)
  }
}

function addModal(url, media_type) {
  if (media_type == 'image') {
    var modal1 = document.getElementById('myModalImg');
    var modalImg = document.getElementById("img02");
    modal1.style.display = "block";
    modalImg.src = url;
    var span = document.getElementsByClassName("close")[1];
    span.addEventListener('click', function() {
      modal1.style.display = "none";
    });
  } else if (media_type == 'video') {
    var modal2 = document.getElementById('myModalVideo');
    var modalVid = document.getElementById("img01");
    modal2.style.display = "block";
    modalVid.src = url;
    var span = document.getElementsByClassName("close")[0];
    span.addEventListener('click', function() {
      modal2.style.display = "none";
    });
  }
}

imageOfTheDay()
searchImageBtn.addEventListener('click', getSearchImage)
