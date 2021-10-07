const newsletterURL = "https://blog.styve.digital/wp-json/wp/v2/comments";
const newsletterForm = document.querySelector(".footer-news-form");

newsletterForm.addEventListener("submit", validateNewsMail);

function submitNewsMail(e) {
  e.preventDefault();
  const [newsMailArray] = e.target.elements;

  const newsletterData = {
    post: 75,
    author_name: "Newsletter Subscriber",
    author_email: newsMailArray.value,
    content: newsMailArray.value,
  };
  console.log(newsletterData);

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

const newsMailInput = document.getElementById("newsMail");
const newsMailError = document.getElementById("newsMailError");

function validateNewsMail(event) {
  event.preventDefault();

  if (validateEmail(newsMailInput.value)) {
    newsMailInput.style.border = "2px solid #60ab60";
    newsMailError.innerHTML = "";
  } else {
    newsMailError.innerHTML = "Enter a valid e-mail address";
    newsMailInput.style.border = "2px solid #ff7a7a";
  }
  if (validateEmail(newsMailInput.value)) {
    submitNewsMail(event);
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const emailMatch = regEx.test(email);
  return emailMatch;
}
