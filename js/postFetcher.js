const postsURL = "https://blog.styve.digital/wp-json/wp/v2/posts?_embed&?&categories=2";
const postsContainer = document.querySelector(".blog-posts-grid");
const loadMoreBtn = document.querySelector(".load-more-btn");

async function getPosts(url) {
  const response = await fetch(url);
  const posts = await response.json();

  posts.forEach(function (post) {
    const postContent = post.content.rendered;
    const postLimited = postContent.slice(0, 300);
    const postIMG = post._embedded["wp:featuredmedia"][0].source_url;

    let postsDate = new Date(post.date);
    // wordArray = postContent.split(" ")

    let genRandomRotation = function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    };
    const minNumb = -5;
    const maxNumb = 6;

    let randomRotateIMG = genRandomRotation(minNumb, maxNumb);

    postsContainer.innerHTML += `<div class="blog-post-card">
    <div class="blog-posts-img-container" style="transform:rotate(${randomRotateIMG}deg)"><img class="blog-posts-img"src="${postIMG}"></img></div>
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
  const loadMoreURL = postsURL + `&?&page=2`;
  loadMoreBtn.style.display = "none";

  getPosts(loadMoreURL);
};
