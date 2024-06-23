// * 4. Change all of your fetch() functions to axios!
//  * - axios has already been imported for you within index.js.
//  * - If you've done everything correctly up to this point, this should be simple.
//  * - If it is not simple, take a moment to re-evaluate your original code.
//  * - Hint: Axios has the ability to set default headers. Use this to your advantage
//  *   by setting a default header with your API key so that you do not have to
//  *   send it manually with all of your requests! You can also set a default base URL!
//  */
// /**
//  * 


// axios.defaults.baseURL = "https://api.thecatapi.com/v1/breeds"

axios.defaults.headers.common[`x-api-key`] = 'live_3ptZ6oXj6Gz7au1pT24sFNfqorps6olUzNrQnPOp9Gm1xxIEAFN8ZSdBhMph5EFc'

function initialLoad(){

    axios("https://api.thecatapi.com/v1/breeds?limit=10")
        .then(response =>{
            const data = response.data
            data.forEach(breed =>
                {
                    const option = document.createElement('option')
                    option.setAttribute('value', breed.id)
                    option.innerText = breed.name;
                    breedSelect.append(option)
                })


        }).catch(e =>{
            console.log(e.message)

        })
            // console.log(data)
            //Use data from the API to create the options for the dropmenu


    }

initialLoad()

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

