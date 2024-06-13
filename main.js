let popupOpen = false;
let animationOn = false;
const popupBg = document.querySelector(".popup-bg");
const popup = document.querySelector(".popup");
const buttonNotNow = document.querySelector(".popup__button-not-now");

const onPopupOpen = () => {
  animationOn = true;
  popupBg.classList.remove("hidden");
  setTimeout(() => {
    popupBg.classList.remove("hidden-popup");
    popup.classList.remove("hide");
  }, 1);
  popupOpen = true;
  setTimeout(() => animationOn = false, 1000);
};

onPopupOpen();

window.addEventListener("click", event => {
  if (event.target !== buttonNotNow && !event.target.closest(".swiper")) {
    if (!popupOpen && !animationOn) {
      onPopupOpen();
    }
  }
});

buttonNotNow.addEventListener("click", () => {
  if (!animationOn) {
    animationOn = true;
    popupBg.classList.add("hidden-popup");
    popup.classList.add("hide");
    setTimeout(() => {
      popupOpen = false;
      popupBg.classList.add("hidden");
      animationOn = false;
    }, 1000);
  }
});


// ИНИЦИАЛИЗАЦИЯ ПЛАВАЮЩЕЙ СЕТКИ
document.addEventListener('DOMContentLoaded', function() {
  const masonryInit = () => {
    const grid = document.querySelector('.grid');
    const containerWidth = grid.offsetWidth; // Получить ширину контейнера
// Вычислить желаемую ширину столбца
    const widthGrid =  (containerWidth - 8) / 2;
    const masonry = new Masonry(grid, {
      // options...
      itemSelector: '.grid-item',
      columnWidth: widthGrid,
      gutter: 8,
      transitionDuration: 0
    });

    const gridDesktop = document.querySelector('.grid-desktop');
    const containerWidthDesktop = gridDesktop.offsetWidth; // Получить ширину контейнера
// Вычислить желаемую ширину столбца
    const widthGridDesktop =  (containerWidthDesktop - 64) / 5;
    const masonryDesktop = new Masonry(gridDesktop, {
      // options...
      itemSelector: '.grid-item',
      columnWidth: widthGridDesktop,
      gutter: 16,
      transitionDuration: 0
    });
  };

  masonryInit();

  const images = document.querySelectorAll('.grid-item img');
  let loadedImages = 0; // Счетчик загруженных изображений

  function checkLoad() {
    loadedImages++;

    if (loadedImages === images.length) { // Проверка, все ли изображения загружены
      // Выполнить желаемое действие после загрузки всех изображений
      // console.log('Все изображения загружены!');
      masonryInit();
    }
  }

  images.forEach(image => {
    image.addEventListener('load', checkLoad);
  });
});