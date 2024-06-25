import * as Carousel from './Carousel.js'

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");

const getFavouritesBtn = document.getElementById("getFavouritesBtn");


// * 4. Change all of your fetch() functions to axios.

axios.defaults.baseURL = "https://api.thecatapi.com/v1/"

axios.defaults.headers.common[`x-api-key`] = 'live_3ptZ6oXj6Gz7au1pT24sFNfqorps6olUzNrQnPOp9Gm1xxIEAFN8ZSdBhMph5EFc'

async function initialLoad(){

    try{
    const response = await axios.get("/breeds?limit=10")
       
    const data = response.data
            data.forEach(breed =>
                {
                    const option = document.createElement('option')
                    option.setAttribute('value', breed.id)
                    option.innerText = breed.name;
                    breedSelect.append(option)
                })
                

        }catch(e){
            console.log(e.message)

        }}
            

initialLoad()


breedSelect.addEventListener('change', async function () {
    const selectedBreedId = this.value;


    Carousel.clear();

    try{
    //Varible that stores the value of the current selected element
    const response = await axios.get(`/images/search?breed_ids=${selectedBreedId}&limit=5`)
    const data = await response.data
        const breedInfo = data[0].breeds
       
        data.forEach(element =>{
            const imgURL = element.url;
            const catImage = Carousel.createCarouselItem(imgURL, breedInfo, data[0].id)
            Carousel.appendCarousel(catImage)

        })
         console.log(data)

        Carousel.start()


    }catch(e) {
        console.log(e.message)

    }})
      


/* 5. Add axios interceptors to log the time between request and response to the console.
 */

const instance = axios.create()

instance.interceptors.request.use((config) => {
    console.log(`Request begins at ${new Date().toLocaleDateString()}`)
  return config;
}, function (error) {
  return Promise.reject(error);
});

  /**
 * 6. Create a progress bar to indicate the request is in progress.
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */

  const progressBar = document.getElementById("progressBar");

  instance.interceptors.request.use((config) => {
      
      progressBar.style.width = '0%'
      document.body.style.cursor = 'progress'
      return config
  })
  


/** 8.Create a system to "favourite" certain images.*/

//Export function to be used in the carousel.js file
export async function favourite (imgId) {
    try{
    const response = await axios.get(`/favourites?image_id=${imgId}`)
    const data =  await response.data;
  
    console.log(`Image ${imgId} has been favorited sucessfully`);
    }catch(e){
        console.log(e.message)
    }
  }  

  /*9. Test your favourite() function by creating a getFavourites() function by using axios to get all of your favourites from the cat API.*/
  
getFavouritesBtn.addEventListener('click', async function(){
 
    Carousel.clear();

    try{
        const response = await axios.get("/favourites")
        const data = await response.data
       
        data.forEach(favourite =>{
           let imgSrc = favourite.image.url;
           let imgAlt = favourite.image.id;
           let imgId = favourite.image.id;
           let imgFavourite = Carousel.createCarouselItem(imgSrc, imgAlt, imgId)
            Carousel.appendCarousel(imgFavourite)

        })
         console.log(data)

        Carousel.start()
}catch(e){
    console.log(e.message)
}
})  

