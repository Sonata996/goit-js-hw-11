import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css";
import { serviceGetApi } from "./api";

const elements = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.input-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more')
}
elements.form.addEventListener('submit', onSubSearcImg)
elements.loadMore.addEventListener('click', onClickNexpPage)
let countPage = 1
let qParam = ''
let valueInput = ''
let countTotalHits = 0
let foo = 0

const lightbox = new SimpleLightbox('.gallery a', { 
 captionDelay: 250
});


elements.loadMore.classList.add('is-hidden')


const parameters ={
  key:'39127754-be1e37310bae930d939d50f92',
  imageType : "photo",
  orientation : "horizontal",
  safesearch : true,
  per_page: 40,
  page: 1
}

function onSubSearcImg(event){
  event.preventDefault()
  elements.loadMore.classList.add('is-hidden')
  valueInput = event.target.elements[0]

  if (valueInput.value !== qParam) {

    countPage = 1
    qParam = valueInput.value
    elements.gallery.textContent = ''
    
    serviceGetApi(parameters,qParam,countPage)
    .then(data =>  {
      
    countTotalHits = 0
    foo = data.hits.length
    countTotalHits += foo
    console.log(countTotalHits)

    
    if (foo === 0) {
      elements.gallery.textContent = ''
     return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }

    if (countTotalHits >= data.totalHits) {
      createMarkup(data.hits)
      elements.loadMore.classList.add('is-hidden')
      return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
      }

    createMarkup(data.hits)})
  .catch(reject =>  {
    elements.gallery.textContent = ''
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')}
  )
  } else{
      elements.loadMore.classList.remove('is-hidden')
       Notiflix.Notify.info("Button to search for more, located at the bottom")
  }
  


}
``

async function createMarkup(arr) {
  const markup = arr.map(elem =>
   ` <div class="photo-card gallery__item">
    <a class="gallery__link" href="${elem.webformatURL}">
        <img class="img-card gallery__image" src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes ${elem.likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${elem.views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${elem.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${elem.downloads}</b>
      </p>
    </div>
    
    </div>
  `).join()
  elements.loadMore.classList.remove('is-hidden')
  elements.gallery.insertAdjacentHTML('beforeend', markup)
  lightbox.refresh();
}

function onClickNexpPage(){
  countPage +=1

 
  serviceGetApi(parameters,qParam,countPage)
  .then(data =>  {
    createMarkup(data.hits)

    foo = data.hits.length
    countTotalHits += foo
    console.log(countTotalHits)

    if (countTotalHits >= data.totalHits) {
      elements.loadMore.classList.add('is-hidden')
      return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
      }


  })
    .catch(reject =>  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    )
  elements.loadMore.classList.remove('is-hidden')
}

