const movieDatabaseAPI = "de99d62b32317eae24a04bd50f9292cd"
const queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=de99d62b32317eae24a04bd50f9292cd";

let movieData = null;

fetch(queryURL).then((response) => response.json()).then((movieObject) => {
        console.log(movieObject.results)
        
        movieObject.results.forEach( (movie) => {
          generateCards(movie);
        })
        // cardRowSetup(generateCards);
        
})




// console.log(fakeMoviesAPI.results[0]) 

// let firstMovie = fakeMoviesAPI.results[0]

// console.log(firstMovie)

// document.body.style.backgroundColor = "black"

function generateCards(movieObject){

    //creates movie conatiners for each card 
    let movieContainer = document.createElement("section");

    let image = document.createElement('img')
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
    movieContainer.appendChild(image)


    //create the star
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent= document.createTextNode('⭐️');
    star.appendChild(starContent);
    movieContainer.appendChild(star)

    //create rating
    let rating = document.createElement('span');
    let ratngContent = document.createTextNode(movieObject.vote_average)
    rating.classList.add('rating');
    rating.appendChild(ratngContent);
    movieContainer.appendChild(rating);

    //create average container
    let averageContainer = document.createElement('div');
    averageContainer.classList.add('average');
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    movieContainer.appendChild(averageContainer)

    //create movie title
    let movieName = document.createElement('div');
    movieName.classList.add('movie-name');
    movieName.innerText = movieObject.original_title
    movieContainer.appendChild(movieName)
    document.body.appendChild(movieContainer)
    

}

// function cardRowSetup(generateCards){
// for (movieObject.results[i] = 0; movieObject.results[i] % 5; movieObject.results[i]++) {
//     generateCards += movieObject[i] + "<br>";
//   }
// }

// generateCards(movieData)