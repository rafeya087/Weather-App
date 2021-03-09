const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";
  const location = input.value;
  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.weather;
      }
    })
    .catch((error) => {
      messageOne.textContent = error.error;
      messageTwo.textContent = "";
    });
});
