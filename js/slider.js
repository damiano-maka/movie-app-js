let slideIndex = 0;
const slides = document.querySelectorAll("div.mySlides");

function showSlide(n) {
  if (n < 0) {
    slideIndex = slides.length - 1;
  } else if (n >= slides.length) {
    slideIndex = 0;
  } else {
    slideIndex = n;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function previousSlide() {
  showSlide(slideIndex - 1);
}

function initializeEventListeners() {
  const prevButton = document.querySelector("dodo.prev");
  const nextButton = document.querySelector("dodo.next");

  prevButton.addEventListener("click", previousSlide);
  nextButton.addEventListener("click", nextSlide);
}

showSlide(slideIndex);
initializeEventListeners();
setInterval(nextSlide, 12000);
