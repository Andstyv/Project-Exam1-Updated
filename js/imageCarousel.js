const postsURL = "https://blog.styve.digital/wp-json/wp/v2/posts?_embed&?&per_page=50&?&categories=2";
const carouselContainer1 = document.querySelector(".img-carousel-container1");
const carouselContainer2 = document.querySelector(".img-carousel-container2");

const arrowLeft = document.getElementById("arrow-left");
const arrowLeftSmall = document.getElementById("arrow-left-small");
const arrowRight = document.getElementById("arrow-right");
const arrowRightSmall = document.getElementById("arrow-right-small");
let carouselIndex = 1;
let i = 0;

arrowLeft.onclick = function () {
  slideCarousel(-1);
};
arrowLeftSmall.onclick = function () {
  slideCarousel(-1);
};

arrowRight.onclick = function () {
  slideCarousel(1);
};
arrowRightSmall.onclick = function () {
  slideCarousel(1);
};

function slideCarousel(n) {
  showCarouselImages((carouselIndex += n));
}

function showCarouselImages(n) {
  const blogImages = document.querySelectorAll(".img-carousel");

  if (n > blogImages.length) {
    carouselIndex = 1;
  }
  if (n < 1) {
    carouselIndex = blogImages.length;
  }
  for (i = 0; i < blogImages.length; i++) {
    blogImages[i].style.display = "none";
  }
  blogImages[carouselIndex - 1].style.display = "flex";
}
showCarouselImages(carouselIndex);

async function getBlogImages(url) {
  const response = await fetch(url);
  const posts = await response.json();

  for (i = 0; i < 4; i++) {
    carouselContainer1.innerHTML += `<li class="latest-blog-item">
                                    <a href="blog_post.html?id=${posts[i].id}">
                                    <img class="latest-blog-img" alt="${posts[i].title.rendered}" src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}"></img>
                                    <div class="latest-blog-title">${posts[i].title.rendered}</div>
                                    <div class="latest-blog-overlay"></div>
                                    </a>
                                    </li>`;
  }
  for (i = 4; i < 8; i++) {
    carouselContainer2.innerHTML += `<li class="latest-blog-item">
    <a href="blog_post.html?id=${posts[i].id}">
    <img class="latest-blog-img" src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}"></img>
    <div class="latest-blog-title">${posts[i].title.rendered}</div>
    <div class="latest-blog-overlay"></div>
    </a>
    </li>`;
  }
}

getBlogImages(postsURL);
