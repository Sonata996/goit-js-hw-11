import axios from 'axios';
// import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api/'

export async function serviceGetApi(parameters,q,page) {
  const{key,imageType,orientation,safesearch,per_page} = parameters
    const URL = `?key=${key}&imageType=${imageType}&orientation=${orientation}&safesearch=${safesearch}
    &q=${q}&per_page=${per_page}&page=${page}`;
      const response = await axios.get(URL)

      return response.data;
}

// export class ServiceGetApi {
//   // page = 1
//     constructor(value, page){
//         this.page = page
//         this.value = value
//     }
//   async fetchGetAPI() {
//   const parameters ={
//   key:'39127754-be1e37310bae930d939d50f92',
//       imageType : "photo",
//       orientation : "horizontal",
//       safesearch : true,
//       q : `${this.value}`,
//       per_page: 40,
//       page: `${this.page}`
//   }
// const URL = `https://pixabay.com/api?key=${parameters.key}
// &imageType=${parameters.imageType}&orientation=${parameters.orientation}&safesearch=${parameters.safesearch}
// &q=${parameters.q}&per_page=${parameters.per_page}&page=${parameters.page}`;//&per_page=40

//   const response = await axios.get(URL)
//   return response.data.hits;
// }
// // countPage(){
// //  return this.page += 1
// // }
// }
// fetchGetAPI().then(res => console.log(res))

