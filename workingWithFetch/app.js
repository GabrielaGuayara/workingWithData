import * as Carousel from './Carousel.js'

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.



// Step 0: Store your API key here for reference and easy access.
const url = "https://api.thecatapi.com/v1/breeds?limit=10";
const API_KEY = "live_3ptZ6oXj6Gz7au1pT24sFNfqorps6olUzNrQnPOp9Gm1xxIEAFN8ZSdBhMph5EFc"


/*
 * 1. Create an async function "initialLoad" that retrieves a list of breeds from the cat API using fetch().
 */

//Export getAllCats function to be used in other js files
async function initialLoad(){

    try{

        //Getting data from the API by using the fetch function
       const resp = await fetch(url,{
        headers: {
            'x-api-key': API_KEY
          }})
            if(!resp.ok){
                throw new Error('Error loading API') }
        
            //Extract json object from resp and store it in the data variable
            const data = await resp.json();
             
            console.log(data)
            //Use data from the API to create the options for the dropmenu
            data.forEach(breed =>
                {
                    const option = document.createElement('option')
                    option.setAttribute('value', breed.id)
                    option.innerText = breed.name;
                    breedSelect.append(option)
                })



            //Handle error with catch. Display the error message in the console
            }catch(e){
                console.log(e.message)
                throw e;
            }}
    



/* 2. Create an event handler for breedSelect that retrieves information on the selected breed from the cat API using fetch().*/

breedSelect.addEventListener('change', async function () {
    
    //Varible that stores the value of the current selected element
    const selectedBreedId = this.value;

       Carousel.clear();

      
      //If the user select 'See All Cats' option, the getAllCats function will be called
        try {
            const resp = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=5`, {
                headers: {
                    'x-api-key': api_key
                }
            });

              if(!resp.ok){
                throw new Error('Error loading API') 
              }

            //Extract json object from resp and store it in the data variable
            const data = await resp.json();

            console.log(data)
            
         

            const breedInfo = data[0].breeds

            data.forEach(element =>{
                const imgURL = element.url;
                const catImage = Carousel.createCarouselItem(imgURL, breedInfo, data[0].id)
                Carousel.appendCarousel(catImage)
         
                console.log(element)

            })

            Carousel.start()
              //Handling error with catch
              } catch (error) {
                console.log(error);
        }
       }
    );


    initialLoad()


