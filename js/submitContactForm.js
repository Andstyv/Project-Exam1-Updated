const postCommentURL = "https://blog.styve.digital/wp-json/wp/v2/comments";
const contactForm = document.getElementById("blog-contact");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const [contactName, contactEmail, contactSubject, contactMessage] = event.target.elements;

  const commentData = {
    post: 56,
    author_name: contactName.value,
    author_email: contactEmail.value,
    content: "Subject: " + contactSubject.value + " | " + "Message: " + contactMessage.value,
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
