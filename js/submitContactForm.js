const postCommentURL = "https://blog.styve.digital/wp-json/wp/v2/comments";
const contactForm = document.getElementById("blog-contact");
const successIcon = document.getElementById("form-success-check");

// SUBMIT CONTACT FORM FUNCTION
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
      successIcon.style.display = "block";
      contactForm.style.fontStyle = "italic";
      contactForm.innerHTML = "Your contact form was successfully submitted.";
    })
    .catch((error) => {
      console.error(error);
    });
}

// FORM VALIDATION
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactSubject = document.getElementById("contactSubject");
const contactMessage = document.getElementById("contactMessage");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjError = document.getElementById("subjError");
const msgError = document.getElementById("msgError");

function validateContactForm(event) {
  event.preventDefault();

  if (checkLength(contactName.value, 5)) {
    contactName.style.border = "2px solid #60ab60";
    nameError.innerHTML = "";
  } else {
    nameError.innerHTML = "Enter a valid name (min. 5 char.)";
    contactName.style.border = "2px solid #ff7a7a";
  }

  if (validateEmail(contactEmail.value)) {
    contactEmail.style.border = "2px solid #60ab60";
    emailError.innerHTML = "";
  } else {
    emailError.innerHTML = "Enter a valid e-mail address";
    contactEmail.style.border = "2px solid #ff7a7a";
  }

  if (checkLength(contactSubject.value, 15)) {
    contactSubject.style.border = "2px solid #60ab60";
    subjError.innerHTML = "";
  } else {
    subjError.innerHTML = "Enter a valid subject (min. 15 char.)";
    contactSubject.style.border = "2px solid #ff7a7a";
  }

  if (checkLength(contactMessage.value, 25)) {
    contactMessage.style.border = "1px solid #60ab60";
    msgError.innerHTML = "";
  } else {
    msgError.innerHTML = "Enter a valid message (min. 25 char.)";
    contactMessage.style.border = "1px solid #ff7a7a";
  }

  if (checkLength(contactName.value, 5) && checkLength(contactSubject.value, 15) && checkLength(contactMessage.value, 25) && validateEmail(contactEmail.value)) {
    submitContactForm(event);
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

// SUBSCRIBE TO NEWSLETTER FUNCTION
const newsletterURL = "https://blog.styve.digital/wp-json/wp/v2/comments";
const newsletterForm = document.querySelector(".footer-news-form");

newsletterForm.addEventListener("submit", submitNewsForm);

function submitNewsForm(e) {
  e.preventDefault();
  const [newsMail] = e.target.elements;

  const newsletterData = {
    post: 75,
    author_name: "Newsletter Subscriber",
    author_email: newsMail.value,
    content: newsMail.value,
  };

  fetch(newsletterURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newsletterData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      return response.json();
    })
    .then((newsletterData) => {
      console.log("Success", newsletterData);
      newsletterForm.innerHTML = `<div class="footer-news-success">Thank you for subscribing!</div>`;
    })
    .catch((error) => {
      console.log(error);
    });
}
