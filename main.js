import { API_KEY, BASE_URL, IMG_URL, language } from "./api.js";

const btn = document.querySelector("#btn");
const posterElement = document.querySelector("#movie-poster");
const titleElement = document.querySelector("#movie-title");
const descriptionElement = document.querySelector("#movie-description");

let movie;

async function fetchMovie() {
  const movie_id = Math.floor(Math.random() * 998796);

  const response = await fetch(`${BASE_URL}${movie_id}?${API_KEY}&${language}`);
  const data = await response.json();

  const { adult, poster_path, title, overview } = data;

  const isMovieOk = !adult && !!poster_path && !!title && !!overview;

  if (isMovieOk) {
    movie = { adult, poster_path, title, overview };
    createElement(movie);
  } else {
    movie = "Ops, hoje não é dia de assistir filme. Bora codar!";
    createElement(movie);
  }
  return;
}

function createElement(movie) {
  if (typeof movie !== "string") {
    posterElement.src = `${IMG_URL}${movie.poster_path}`;
    titleElement.textContent = movie.title;
    descriptionElement.textContent = movie.overview;
  } else {
    titleElement.textContent = movie;
  }
}

btn.addEventListener("click", () => {
  console.log(fetchMovie());
});
// 998796
// https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
