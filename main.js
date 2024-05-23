let popupOpen = false;
const popup = document.querySelector(".popup-bg");
const buttonNotNow = document.querySelector(".popup__button-not-now");

window.addEventListener("click", event => {
  console.log(event.target.closest(".swiper"))
  if (event.target !== buttonNotNow && !event.target.closest(".swiper")) {
    // console.log(event.target);
    console.log();
    console.log(popupOpen, popup);
    if (!popupOpen) {
      popup.classList.remove("hidden");
      popupOpen = true;
    }
  }
});

buttonNotNow.addEventListener("click", () => {
  popup.classList.add("hidden");
  popupOpen = false;
})