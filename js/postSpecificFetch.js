const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseURL = "https://blog.styve.digital/wp-json/wp/v2/posts/";
const blogPostURL = baseURL + id;

const blogPostTitle = document.querySelector(".blog-post-title");
const blogPostContent = document.querySelector(".blog-post-content");
const blogPostDate = document.querySelector(".blog-post-date");
const commentForm = document.querySelector(".new-comment-form");

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
    const comments = await response.json();

    if (comments.length) {
      comments.forEach(function (comment) {
        let commentDate = new Date(comment.date);

        commentGrid.innerHTML += `
        <div>${comment.author_name}</div>
        <div>${commentDate.toDateString()}</div>
        <div>${comment.content.rendered}</div>`;
      });
    } else {
      commentGrid.innerHTML = `<div>This post has no comments.</div>`;
    }
  } catch (error) {
    console.log(error);
  }
}
fetchPostComments(commentPostURL);

const postCommentURL = "https://blog.styve.digital/wp-json/wp/v2/comments";
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const [commentName, commentEmail, comment] = event.target.elements;

  const commentData = {
    post: id,
    author_name: commentName.value,
    author_email: commentEmail.value,
    content: comment.value,
  };

  fetch(postCommentURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      return response.json();
    })
    .then((commentData) => {
      console.log("Success", commentData);
      location.reload();
    })
    .catch((error) => {
      console.error("Error", error);
    });
});
