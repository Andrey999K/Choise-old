let popupOpen = false;
let animationOn = false;
const popupBg = document.querySelector(".popup-bg");
const popup = document.querySelector(".popup");
const buttonNotNow = document.querySelector(".popup__button-not-now");

window.addEventListener("click", event => {
  if (event.target !== buttonNotNow && !event.target.closest(".swiper")) {
    if (!popupOpen && !animationOn) {
      animationOn = true;
      popupBg.classList.remove("hidden");
      setTimeout(() => {
        popupBg.classList.remove("hidden-popup");
        popup.classList.remove("hide");
      }, 1);
      popupOpen = true;
      setTimeout(() => animationOn = false, 1000);
    }
  }
});

buttonNotNow.addEventListener("click", () => {
  if (!animationOn) {
    animationOn = true;
    popupBg.classList.add("hidden-popup");
    popup.classList.add("hide");
    popupOpen = false;
    setTimeout(() => {
      popupBg.classList.add("hidden");
      animationOn = false;
    }, 1000);

  }
})