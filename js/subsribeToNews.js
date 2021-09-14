const newsletterURL = "https://blog.styve.digital/wp-json/wp/v2/comments";
const newsletterForm = document.querySelector(".footer-news-form");

newsletterForm.addEventListener("submit", submitContactForm);

function submitContactForm(e) {
  e.preventDefault();
  const [newsMail] = e.target.elements;

  const newsletterData = {
    post: 75,
    author_name: "Newsletter Subscriber",
    author_email: newsMail.value,
    content: newsMail.value,
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
      console.error(error);
    });
}
