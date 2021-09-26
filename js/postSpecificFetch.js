const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseURL = "https://blog.styve.digital/wp-json/wp/v2/posts/";
const blogPostURL = baseURL + id + "?_embed";

const blogHeadImg = document.querySelector(".blog-post-header-img");
const blogPostTitle = document.querySelector(".blog-post-title");
const blogPostContent = document.querySelector(".blog-post-content");
const blogPostDate = document.querySelector(".blog-post-date");
const commentForm = document.querySelector(".new-comment-form");
const blogPostModal = document.querySelector(".blog-post-modal");

async function fetchBlogPost(url) {
  try {
    const response = await fetch(url);
    const post = await response.json();

    let postDate = new Date(post.date);
    const postIMG = post._embedded["wp:featuredmedia"][0].source_url;

    blogHeadImg.innerHTML = `<img class="blog-post-img"src=${postIMG} alt="${post.title.rendered}"></img>`;
    blogPostModal.innerHTML = `<div class="blog-post-modal-txt">Press ESC or click outside of image to close</div>
    <img class="blog-post-modal-img"src=${postIMG} alt="${post.title.rendered}"></img>`;
    blogPostTitle.innerHTML = `${post.title.rendered}`;
    blogPostContent.innerHTML = `${post.content.rendered}`;
    blogPostDate.innerHTML = `${postDate.toUTCString()}`;
    document.title = `Blog Post | ${post.title.rendered}`;
    document.meta;
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

        commentGrid.innerHTML += `<div class="blog-comment-container">
        <div class="blog-comment-avatar">
          <img class="blog-comment-avatar-img"src="${comment.author_avatar_urls[48]}" alt="${comment.author_name} Avatar"></img></div>
        <div class="blog-comment-author">${comment.author_name}</div>
        <div class="blog-comment-date">${commentDate.toUTCString()}</div>
        <div class="blog-comment-content">${comment.content.rendered}</div></div>`;
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
commentForm.addEventListener("submit", validateCommentForm);

function submitCommentForm(event) {
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
      console.log(error);
    });
}

const commentName = document.getElementById("commentName");
const commentEmail = document.getElementById("commentEmail");
const commentMessage = document.getElementById("comment-msg");

const commentNameError = document.getElementById("comment-name-err");
const commentEmailError = document.getElementById("comment-mail-err");
const commentMsgError = document.getElementById("comment-msg-err");

function validateCommentForm(event) {
  event.preventDefault();

  if (checkLength(commentName.value, 5)) {
    commentNameError.innerHTML = "";
  } else {
    commentNameError.innerHTML = "Enter a valid name (min. 5 char.)";
  }

  if (validateEmail(commentEmail.value)) {
    commentEmailError.innerHTML = "";
  } else {
    commentEmailError.innerHTML = "Enter a valid email address";
  }

  if (checkLength(commentMessage.value, 10)) {
    commentMsgError.innerHTML = "";
  } else {
    commentMsgError.innerHTML = "Enter a valid comment (min. 10 char.)";
  }

  if (checkLength(commentName.value, 5) && checkLength(commentMessage.value, 10) && validateEmail(commentEmail.value)) {
    submitCommentForm(event);
  }
}

function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const emailMatch = regEx.test(email);
  return emailMatch;
}

function controlModal() {
  const modalBackground = document.querySelector(".blog-post-modal");

  blogHeadImg.onclick = function () {
    if (blogPostModal.style.display === "block") {
      blogPostModal.style.display = "none";
    } else {
      blogPostModal.style.display = "block";
    }
  };

  modalBackground.onclick = function () {
    if (blogPostModal.style.display === "block") {
      blogPostModal.style.display = "none";
    } else {
      blogPostModal.style.display = "block";
    }
  };

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      blogPostModal.style.display = "none";
    }
  });
}
controlModal();
