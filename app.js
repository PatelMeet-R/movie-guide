let btn = document.querySelector(".searchbtn");
let inp = document.querySelector(".inputBox");
let searchForm = document.querySelector("form");
let movieContainer = document.querySelector(".movie-container");

// showmessage create for passing the msg
const showMessage = (message) => {
  movieContainer.innerHTML = `<h2> ${message}</h2>`;
  movieContainer.classList.add("nobackground");
};

// search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(inp.value);
  const movieName = inp.value.trim();
  if (movieName !== "") {
    showMessage("fetching Movie Information");
    getMovieInfo(movieName);
  } else if (movieName === "") {
    showMessage("You haven't Enter Movie name on SearchBox ");
  } else {
    showMessage("check the movie spelling and Search again");
  }
});

// function to fetch movie details using api
let getMovieInfo = async (movie) => {
  try {
    const APIkey = "a8e43023";
    let url = `https://www.omdbapi.com/?apikey=${APIkey}&t=${movie}`;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    showMovieData(data);
  } catch (err) {
    showMessage("No Movie Found !");
  }
};
// below function is create for showing the movie details on webpage
const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("nobackground");

  // use destructuring assignment to extract properties from data object
  const { Title, imdbRating, Genre, released, Runtime, actors, Plot, Poster } =
    data;

  let img = document.createElement("img");
  img.classList.add("img-poster");
  img.setAttribute("src", Poster);
  movieContainer.append(img);

  let movieInfo = document.createElement("div");
  movieInfo.classList.add("movieInfo");
  movieInfo.innerHTML = `<h2>${Title}</h2>
    <h5><strong>&#11088;</strong> ${imdbRating} </h5>`;
  movieContainer.append(movieInfo);

  let moviegenre = document.createElement("div");
  moviegenre.classList.add("movie-genre");

  Genre.split(",").forEach((element) => {
    let p = document.createElement("p");
    p.innerHTML = element;
    moviegenre.appendChild(p);
  });
  movieInfo.append(moviegenre);
  movieInfo.innerHTML += `
    <P> <strong>Released date : </strong> ${released}</P>
    <P><strong>Duration :</strong> ${Runtime}</P>
    <P><strong> cast :</strong> ${actors}</P>
    <P><strong>Plot :</strong> ${Plot}</P> `;
};
