const postsURL = "https://blog.styve.digital/wp-json/wp/v2/posts/";
const postsContainer = document.querySelector(".blog-posts-grid");
const loadMoreBtn = document.querySelector(".load-more-btn");
let randomIMG = "https://picsum.photos/200";

async function getPosts(url) {
  const response = await fetch(url);
  const posts = await response.json();

  posts.forEach(function (post) {
    postsContainer.innerHTML += `<div class="blog-post-card">
    <div class="blog-post-img"><img src="${randomIMG}"</img></div>
    <div class="blog-post-title">${post.title.rendered}</div>
    <div class="blog-post-date">${post.date}</div>
    <a href="blog.html?id=${post.id}">LINK</a>
</div>`;
  });
}
getPosts(postsURL);

loadMoreBtn.onclick = function () {
  const loadMoreURL = postsURL + `?page=2`;
  loadMoreBtn.style.display = "none";

  getPosts(loadMoreURL);
};
