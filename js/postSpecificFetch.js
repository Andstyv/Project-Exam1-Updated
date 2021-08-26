const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get("id");
const baseURL = "https://blog.styve.digital/wp-json/wp/v2/posts/";

const blogPostURL = baseURL + id;

const blogPostTitle = document.querySelector(".blog-post-title");
const blogPostContent = document.querySelector(".blog-post-content");
const blogPostDate = document.querySelector(".blog-post-date");

async function fetchBlogPost(url) {
  try {
    const response = await fetch(url);
    const post = await response.json();
    console.log(post);

    let postDate = new Date(post.date);

    blogPostTitle.innerHTML = `${post.title.rendered}`;
    blogPostContent.innerHTML = `${post.content.rendered}`;
    blogPostDate.innerHTML = `${postDate.toUTCString()}`;
    document.title = `Blog Post | ${post.title.rendered}`;
  } catch (error) {
    console.log(error);
    blogPostContent.innerHTML = `An error occured when calling the API: ${error}`;
  }
}
fetchBlogPost(blogPostURL);
