const postsURL = "https://blog.styve.digital/wp-json/wp/v2/posts?_embed&?&per_page=50";
const carouselContainer1 = document.querySelector(".img-carousel-container1");
const carouselContainer2 = document.querySelector(".img-carousel-container2");
let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  let i;
  const slides = document.querySelectorAll(".mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}
showSlides(slideIndex);

async function getBlogImages(url) {
  const response = await fetch(url);
  const posts = await response.json();

  posts.forEach(function (post) {
    const blogImages = post._embedded["wp:featuredmedia"][0].source_url;
  });

  for (i = 0; i < 4; i++) {
    carouselContainer1.innerHTML += `<li class="test-li"><img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}"></img>
                                            <div class="test-txt">${posts[i].title.rendered}</div></li>`;
  }
  for (i = 4; i < 8; i++) {
    carouselContainer2.innerHTML += `<li class="test-li"><img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}"></img>
    <div class="test-txt">${posts[i].title.rendered}</div></li>`;
  }
}

getBlogImages(postsURL);
