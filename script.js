//pull access api 
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTk5ZDYyYjMyMzE3ZWFlMjRhMDRiZDUwZjkyOTJjZCIsInN1YiI6IjY0ODIwMjAwOTkyNTljMDBhY2NiNWZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqqjV8FERWyGynzZMmAqtQwWQL-kH6zvJNRlqGtdRQI'
  }
};

//create new page variable
let newPage = 1;
const movieDatabaseAPI = "de99d62b32317eae24a04bd50f9292cd"
const queryURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${newPage}`;

//original fetch for first 20
fetch(queryURL, options).then((response) => response.json()).then((movieObject) => {
  console.log(movieObject.results);

  movieObject.results.forEach((movie) => {

    generateCards(movie);

  });

});

//create new fetch so that page reloads adds more than 20 movies 
function fetchAgain(newFetchPage) {
  let newQueryURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${newFetchPage}`;
  fetch(newQueryURL, options).then((response) => response.json()).then((movieObject) => {
    console.log(movieObject.results);

    movieObject.results.forEach((movie) => {

      generateCards(movie);

    });

  });
}

//fetch to pull movies from search bar value
function fetchSearch(searchBarInput) {
  const queryURLFrSrch = `https://api.themoviedb.org/3/search/movie?query=${searchBarInput}&include_adult=false&language=en-US&page=1`;
  fetch(queryURLFrSrch, options).then(response => response.json()).then((matchingMovies) => {
      //console.log(matchingMovies.results);
      document.querySelector("#grid").innerHTML="";

      matchingMovies.results.forEach((match) => {
        //console.log(match.results)
        generateCards(match);

    })
    
  });
  
}

//sets background black color
document.body.style.backgroundColor = "black"


function generateCards(movieObject) {

  //creates movie conatiners for each card and a rid for the containers
  let movieContainer = document.createElement("section");
  let movieGridRow = document.querySelector("#grid")
  movieGridRow.appendChild(movieContainer)

  //adds image to container
  let image = document.createElement('img')
  image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
  movieContainer.appendChild(image)


  //create the star
  let star = document.createElement('span');
  star.classList.add('star');
  let starContent = document.createTextNode('⭐️');
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



}

//creating load more movies button variable
let button = document.createElement("button");
button.innerHTML = "Load More Movies";


//appened to body
let body = document.getElementsByTagName("body")[0];
body.appendChild(button);


//added event handler
button.addEventListener("click", function () {
  newPage++;
  fetchAgain(newPage);
});


//search value to be actioned when submit button is pressed
let searchBox = document.querySelector("#innerSrchBarTxt")
// console.log(searchBox)


submitBttn.addEventListener("click", function (event) {
  event.preventDefault();
  fetchSearch(searchBox.value);
  //console.log(searchBox.value)
})

//labeling creating clear button
const clearBttn = document.getElementById("#clearBttn");
clearBttn.innerHTML = "Clear";

//connecting api to clear button to go to original 20
clearBttn.addEventListener("click", function () {
  newPage = 1;
  fetch(queryURL, options).then((response) => response.json()).then((movieObject) => {
    console.log(movieObject.results);
  
    movieObject.results.forEach((movie) => {
  
      generateCards(movie);
  
    });
  
  });
});


