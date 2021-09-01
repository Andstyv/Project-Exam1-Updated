const postsURL = "https://blog.styve.digital/wp-json/wp/v2/posts?_embed&?&per_page=50&?&categories=2";
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

  for (i = 0; i < 4; i++) {
    carouselContainer1.innerHTML += `<li class="latest-blog-item">
                                    <a href="blog_post.html?id=${posts[i].id}">
                                    <img class="latest-blog-img" src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}"></img>
                                    <div class="latest-blog-title">${posts[i].title.rendered}</div>
                                    </a>
                                    </li>`;
  }
  for (i = 4; i < 8; i++) {
    carouselContainer2.innerHTML += `<li class="latest-blog-item">
    <a href="blog_post.html?id=${posts[i].id}">
    <img class="latest-blog-img" src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}"></img>
    <div class="latest-blog-title">${posts[i].title.rendered}</div>
    </a>
    </li>`;
  }
}

getBlogImages(postsURL);
