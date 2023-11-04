function pressEnter(event){
  if(event.key === 'Enter'){
    searchImages();
  }
}

const apiKey = 'SBbXU0auxF6SsO64N_1SALynVULaePifDo3xfkRCZQI';

const inputSearch = document.querySelector('#search-input');
const buttonSearch = document.querySelector('#search-button');
const containerResult = document.querySelector('#container-result');
const loadMoreBtn =document.querySelector('#more');
let page = 1;

buttonSearch.addEventListener('click', searchImages);
loadMoreBtn.addEventListener('click', loadMoreImg);

function searchImages() {
  const query = inputSearch.value;
  page = 1;
  loadMoreBtn.style.display = 'none';

  fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        showTheImages(data.results);
        if(data.results.length > 0){
          loadMoreBtn.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error fetching images:', error);
    });
}

function loadMoreImg(){
  page++;
  const query = inputSearch.value;

  fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      showTheImages(data.results)
    })
    .catch(error => {
      console.error('Error fetching images:', error)
    })
}

function showTheImages(images) {
  containerResult.innerHTML = '';

  images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.className = 'images';
      imgElement.src = image.urls.small;
      imgElement.loading = 'lazy';
      containerResult.appendChild(imgElement);  
  });
}