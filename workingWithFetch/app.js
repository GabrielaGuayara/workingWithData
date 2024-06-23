import * as Carousel from './Carousel.js'
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.



// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_3ptZ6oXj6Gz7au1pT24sFNfqorps6olUzNrQnPOp9Gm1xxIEAFN8ZSdBhMph5EFc"

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

const url = "https://api.thecatapi.com/v1/breeds?limit=10";


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
    



/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

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


