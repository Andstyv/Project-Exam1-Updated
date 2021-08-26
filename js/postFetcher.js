const postsURL = "https://blog.styve.digital/wp-json/wp/v2/posts/";
const postsContainer = document.querySelector(".blog-posts-grid");
const loadMoreBtn = document.querySelector(".load-more-btn");
let randomIMG = "https://picsum.photos/200";

async function getPosts(url) {
  const response = await fetch(url);
  const posts = await response.json();

  posts.forEach(function (post) {
    const postContent = post.content.rendered;
    const postLimited = postContent.slice(0, 300);

    let postsDate = new Date(post.date);
    // wordArray = postContent.split(" ")

    let genRandomRotation = function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    };
    const minNumb = -5;
    const maxNumb = 6;

    let randomRotateIMG = genRandomRotation(minNumb, maxNumb);

    postsContainer.innerHTML += `<div class="blog-post-card">
    <div class="blog-post-img" style="transform:rotate(${randomRotateIMG}deg)"><img src="${randomIMG}"></img></div>
    <div class="blog-post-title">${post.title.rendered}</div>
    <div class="blog-post-author" ">Author Name</div>
    <div class="blog-post-date">${postsDate.toDateString()}</div>
    <div class="blog-post-content">${postLimited}...</div>
    <a href="blog_post.html?id=${post.id}">Read more</a>
</div>`;
  });
}
getPosts(postsURL);

loadMoreBtn.onclick = function () {
  const loadMoreURL = postsURL + `?page=2`;
  loadMoreBtn.style.display = "none";

  getPosts(loadMoreURL);
};
