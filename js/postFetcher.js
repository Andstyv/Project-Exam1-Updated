const postsURL = "https://blog.styve.digital/wp-json/wp/v2/posts?_embed&?&categories=2";
const postsContainer = document.querySelector(".blog-posts-grid");
const loadMoreBtn = document.querySelector(".load-more-btn");
const searchBtn = document.querySelector(".blog-search-btn");
const clearSearchBtn = document.querySelector(".blog-clear-btn");
const blogPostLoader = document.querySelector(".blog-posts-loader");

async function getPosts(url) {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    if (posts.length) {
      posts.forEach(function (post) {
        const postContent = post.content.rendered;
        const postLimited = postContent.slice(0, 300);
        const postIMG = post._embedded["wp:featuredmedia"][0].source_url;

        let postsDate = new Date(post.date);

        let genRandomRotation = function (min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        };
        const minNumb = -5;
        const maxNumb = 6;

        let randomRotateIMG = genRandomRotation(minNumb, maxNumb);
        blogPostLoader.style.display = "none";
        loadMoreBtn.style.display = "block";
        postsContainer.innerHTML += `

    <div class="blog-post-card">

    <div class="blog-posts-img-container" style="transform:rotate(${randomRotateIMG}deg)"><img class="blog-posts-img"src="${postIMG}" alt="${post.title.rendered}"></img></div>
    <a href="blog_post.html?id=${post.id}" class="blog-post-title-link">
    <div class="blog-posts-title">${post.title.rendered}</div></a>
    <div class="blog-posts-date">${postsDate.toDateString()}</div>
    <div class="blog-posts-content">${postLimited}...</div>
    <a href="blog_post.html?id=${post.id}" class="blog-post-explore-link">Explore this blog post</a>
</div>`;
      });
    } else {
      postsContainer.innerHTML = `<div class="blog-no-results">The search returned no results.</div>`;
    }
  } catch (error) {
    console.log(error);
    blogPostLoader.style.display = "none";
    loadMoreBtn.style.display = "none";
    postsContainer.innerHTML = `<div class="blog-error-msg">ERROR: ${error}</div>`;
  }
}
getPosts(postsURL);

loadMoreBtn.onclick = function () {
  const loadMoreURL = postsURL + `&?&page=2`;
  loadMoreBtn.style.display = "none";

  getPosts(loadMoreURL);
};

function searchBlogPosts() {
  const searchInput = document.getElementById("blog-search").value;
  const searchURL = postsURL + `&?&search=${searchInput}`;

  loadMoreBtn.style.display = "none";
  postsContainer.innerHTML = ``;
  getPosts(searchURL);
}

searchBtn.onclick = function () {
  if (document.getElementById("blog-search").value) {
    searchBlogPosts();
  }
};

clearSearchBtn.onclick = function () {
  postsContainer.innerHTML = "";
  document.getElementById("blog-search").value = "";
  loadMoreBtn.style.display = "block";
  getPosts(postsURL);
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && document.getElementById("blog-search").value) {
    searchBlogPosts();
  }
});
