import { API_KEY, BASE_URL, IMG_URL, language } from "./api.js";

const btn = document.querySelector("#btn");
const posterContainer = document.querySelector(".poster-container");
const posterElement = document.createElement("img");
const titleElement = document.querySelector("#movie-title");
const descriptionElement = document.querySelector("#movie-description");

async function fetchMovie() {
  const movie_id = Math.floor(Math.random() * 998796);

  const response = await fetch(`${BASE_URL}${movie_id}?${API_KEY}&${language}`);
  const data = await response.json();

  const { adult, poster_path, title, overview } = data;

  const isMovieOk = !adult && !!poster_path && !!title;

  if (isMovieOk) {
    const movie = { poster_path, title, overview };
    createElement(movie);
  } else {
    const movie = "Ops, hoje não é dia de assistir filme. Bora codar!";
    createElement(movie);
  }
  return;
}

function createElement(movie) {
  if (typeof movie !== "string") {
    posterElement.src = `${IMG_URL}${movie.poster_path}`;
    posterContainer.appendChild(posterElement);
    titleElement.textContent = movie.title;
    movie.overview
      ? (descriptionElement.textContent = movie.overview)
      : (descriptionElement.textContent =
          "Não encontramos descrição para este filme.");
  } else {
    posterElement.src =
      "https://img.olhardigital.com.br/wp-content/uploads/2021/12/Code.jpg";
    titleElement.textContent = movie;
    descriptionElement.textContent = "";
  }
}

btn.addEventListener("click", fetchMovie);
