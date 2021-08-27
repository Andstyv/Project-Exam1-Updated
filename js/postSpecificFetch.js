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

const commentURL = "https://blog.styve.digital/wp-json/wp/v2/comments/?post=";
const commentPostURL = commentURL + id;
const commentGrid = document.querySelector(".blog-comments-grid");

async function fetchPostComments(url) {
  try {
    const response = await fetch(url);
    const comment = await response.json();

    console.log(comment.length);

    if (comment.length) {
      commentGrid.innerHTML = `<div>${comment[0].content.rendered}</div>`;
    } else {
      commentGrid.innerHTML = `<div>This post has no comments.</div>`;
    }
  } catch (error) {
    console.log(error);
  }
}
fetchPostComments(commentPostURL);
