document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
    API_KEY;

  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  const film = [];
  // Main and back main
  const main = document.getElementById("main");
  const moviePlayer = document.getElementById("movieplayer");
  // Slider
  const imgslide = document.querySelectorAll("div.mySlides img");
  const titoliSlide = document.querySelectorAll("#infofilmPrimafila h1");
  const infoMovieSlide = document.querySelectorAll("#infofilmPrimafila b");
  const h3Slide = document.querySelectorAll("#infofilmPrimafila h3");
  const contenitoreSlider = document.getElementById("contenitoreSlider");
  const menuButtonCatalogo = document.getElementById("catalogo");
  const menuButtonHome = document.getElementById("home");
  const catalogoMenu = document.getElementsByClassName("catalogoM")[0];

  // main film e catalogo
  menuButtonCatalogo.addEventListener("click", () => {
    contenitoreSlider.style.display = "none";
  });

  menuButtonHome.addEventListener("click", () => {
    contenitoreSlider.style.display = "block";
  });

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 99, name: "Documentary" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 10749, name: "Romance" },
    { id: 53, name: "Thriller" },
    { id: 36, name: "History" },
  ];

  setCategory();
  let categoriaSelezionata = [];
  function setCategory() {
    catalogoMenu.innerHTML = ``;
    genres.forEach((genre) => {
      const lista = document.createElement("div");
      lista.classList.add("categoria");
      lista.id = genre.id;
      lista.innerText = genre.name;

      lista.addEventListener("click", () => {
        if (categoriaSelezionata.length == 0) {
          categoriaSelezionata.push(genre.id);
        } else {
          if (categoriaSelezionata.includes(genre.id)) {
            categoriaSelezionata.forEach((id, idx) => {
              if (id === lista.id) {
                categoriaSelezionata.splice(idx, 1);
              }
            });
          } else {
            categoriaSelezionata.push(genre.id);
          }
        }

        getMovies(
          API_URL + `&with_genres=${encodeURI(categoriaSelezionata.join(","))}`
        );
      });

      catalogoMenu.appendChild(lista);
    });
  }

  // Limite delle pagine caricate dalla API
  let currentPage = 1;
  const maxPages = 3;

  // Effettua la richiesta dei dati dalla API all'avvio della pagina
  getMovies(API_URL, currentPage);

  // Funzione asincrona per ottenere i dati dei film dalla API
  async function getMovies(url, page) {
    const res = await fetch(url + `&page=${page}`);
    const data = await res.json();

    // Mostra i film sulla pagina
    showMovies(data.results);
  }

  // Funzione che inserisce i film nel slider e nella lista principale
  function showMovies(movies, i) {
    main.innerHTML = "";
    movies.forEach((movie) => {
      const { title, poster_path, backdrop_path, vote_average, overview, id } =
        movie;
      film.push(movie);

      // Crea l'elemento del film da aggiungere alla lista principale

      const movieEl = document.createElement("div");

      movieEl.classList.add("movie");

      movieEl.innerHTML = `
          <img src="${IMG_PATH + poster_path}" alt="${title}">
          <div class="movie-info">
            <h3>${title}</h3>
            <span>${vote_average}</span>
          </div>
          <div class="overview">
            <a href="#"><h2><b>${title}</b></h2></a>
            <b>${overview}</b>
          </div>
        `;

      main.appendChild(movieEl);

      // Aggiunge un gestore di eventi al clic del titolo per mostrare il player del film
      movieEl.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        showMoviePlayer(movie);
        /* console.log(movie.id); */

        fetch(
          "https://api.themoviedb.org/3/movie/" +
            movie.id +
            "/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c"
        )
          .then((response) => response.json())
          .then((data) => {
            if (data && data.results && data.results.length > 0) {
              const firstVideo = data.results[0];
              const playerIframe = document.createElement("iframe");
              playerIframe.src =
                "https://www.youtube.com/embed/" + firstVideo.key;
              playerIframe.title = `${firstVideo.name}`;
              playerIframe.frameBorder = 0;
              playerIframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
              playerIframe.allowFullscreen = true;

              const playerDiv = document.getElementById("player");
              playerDiv.innerHTML = "";
              playerDiv.appendChild(playerIframe);
            }
          })
          .catch((err) => console.error(err));
      });
    });

    const imgSlides = imgslide;
    const titoliSlides = titoliSlide;
    const infoMovieSlides = infoMovieSlide;
    const h3Slides = h3Slide;
    const sliderLinks = contenitoreSlider.querySelectorAll("a");

    for (let i = 0; i < movies.length; i++) {
      // Cambia la src dell'immagine di sfondo delle slide nel caso sia disponibile
      if (imgSlides[i]) {
        imgSlides[i].setAttribute(
          "src",
          `${IMG_PATH + movies[i].backdrop_path}`
        );
      }
      // Cambia il testo dell'elemento h1 con il titolo del film
      if (titoliSlides[i]) {
        titoliSlides[i].innerHTML = movies[i].title;
      }
      // Cambia il testo dell'elemento b con una breve descrizione del film
      if (infoMovieSlides[i]) {
        infoMovieSlides[i].innerHTML = `${movies[i].overview}...`;
      }
    }

    // Se abbiamo raggiunto il numero massimo di pagine, termina l'esecuzione
    if (currentPage >= maxPages) {
      return;
    }

    currentPage++;
    getMovies(API_URL, currentPage);
  }

  // Funzione per mostrare il player del film selezionato
  function showMoviePlayer(movie) {
    main.style.display = "none";
    contenitoreSlider.style.display = "none";
    moviePlayer.style.display = "block";
    moviePlayer.style.backgroundImage =
      "url(" + IMG_PATH + movie.backdrop_path + ")";
    moviePlayer.innerHTML = `
        <div id="movieplayvideo">
          <h1>${movie.title}</h1>
          <a href="index.html"><h4><b>&#60; Torna indietro</b></h4></a>
          <br>
          <h3>Release Date :${movie.release_date}</h3>
          <br>
          <h3>${movie.overview}</h3>
          <div id="player">
               </div>
        </div>
      `;

    moviePlayer.classList.add("playthemovie");
  }
});
