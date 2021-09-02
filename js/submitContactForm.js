const postCommentURL = "https://blog.styve.digital/wp-json/wp/v2/comments";
const contactForm = document.getElementById("blog-contact");

contactForm.addEventListener("submit", validateContactForm);

function submitContactForm() {
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
}

const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactSubject = document.getElementById("contactSubject");
const contactMessage = document.getElementById("contactMessage");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjError = document.getElementById("subjError");
const msgError = document.getElementById("msgError");

let namePlace = document.getElementsByName("contactName");
let emailPlace = document.getElementsByName("email");
let subjPlace = document.getElementsByName("subject-text");
let msgPlace = document.getElementsByName("message-text");

function validateContactForm(event) {
  event.preventDefault();

  if (checkLength(contactName.value, 5)) {
    contactName.style.border = "1px solid green";
  } else {
    namePlace[0].placeholder = "ERROR: Minimum 5 characters required";
    contactName.value = "";
    contactName.style.border = "1px solid red";
  }

  if (validateEmail(contactEmail.value)) {
    contactEmail.style.border = "1px solid green";
  } else {
    emailPlace[0].placeholder = "ERROR: Must be a valid e-mail address";
    contactEmail.value = "";
    contactEmail.style.border = "1px solid red";
  }

  if (checkLength(contactSubject.value, 15)) {
    contactSubject.style.border = "1px solid green";
  } else {
    subjPlace[0].placeholder = "ERROR: Minimum 15 characters required";
    contactSubject.value = "";
    contactSubject.style.border = "1px solid red";
  }

  if (checkLength(contactMessage.value, 25)) {
    contactMessage.style.border = "1px solid green";
  } else {
    msgPlace[0].placeholder = "ERROR: Minimum 25 characters required";
    contactMessage.value = "";
    contactMessage.style.border = "1px solid red";
  }

  if (checkLength(contactName.value, 5) && checkLength(contactSubject.value, 15) && checkLength(contactMessage.value, 25) && validateEmail(contactEmail.value)) {
    submitContactForm();
  } else {
    console.log("ERRORRRRR");
  }
}

function checkLength(value, len) {
  if (value.trim().length > len) {
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
