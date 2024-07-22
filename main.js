let popupOpen = false;
let animationOn = false;
const popupBg = document.querySelector(".popup-bg");
const popup = document.querySelector(".popup");
const buttonNotNow = document.querySelector(".popup__button-not-now");
const popupDesktop = document.querySelector(".popup-bg-desktop");
console.log(popupDesktop)

const onPopupOpen = () => {
  animationOn = true;
  if (window.innerWidth < 1280) {
    popupBg.classList.remove("hidden");
    setTimeout(() => {
      popupBg.classList.remove("hidden-popup");
      popup.classList.remove("hide");
    }, 1);
    popupOpen = true;
    setTimeout(() => animationOn = false, 1000);
  } else {
    popupDesktop.classList.remove("hidden");
    setTimeout(() => {
      popupDesktop.classList.add("show");
    }, 0);
    setTimeout(() => animationOn = false, 500);
  }
};

popupDesktop.addEventListener("click", e => {
  if (!event.target.closest(".popup-desktop__wrapper")) {
    animationOn = true;
    popupDesktop.classList.remove("show");
    setTimeout(() => {
      popupDesktop.classList.add("hidden");
      popupOpen = false;
      animationOn = false;
    }, 500);
  }
})

if (window.innerWidth < 1280) {
  onPopupOpen();
}

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

const findHighColumn = (heightColumns) => {
  let high = heightColumns[0];
  let numberColumn = 0;
  for (let i = 1; i < heightColumns.length; i++) {
    if (heightColumns[i] < high) {
      high = heightColumns[i];
      numberColumn = i
    }
  }
  return { high, numberColumn };
}

const findLowColumn = (heightColumns) => {
  let high = heightColumns[0];
  for (let i = 1; i < heightColumns.length; i++) {
    if (heightColumns[i] > high) {
      high = heightColumns[i];
    }
  }
  return high;
}

const masonryInit = (widthScreen) => {
  let classGrid = "grid";
  let gap = 8;
  let columnWidth = (document.querySelector(`.${classGrid}`).clientWidth - gap) / 2;
  let columnNumber = 2;
  const body = document.querySelector("body");

  if (widthScreen >= 1280) {
    if (body.className !== "product-page" && body.className !== "selection-page" && body.className !== "profile") {
      classGrid = "grid-desktop";
    }
    columnWidth = 236;
    gap = 16;
    columnNumber = 5;
  }
  const grid = document.querySelector(`.${classGrid}`);
  const gridItems = Array.from(document.querySelectorAll(`.${classGrid} .grid-item__container`));

  grid.style.display = "block";

  // Если всего 1 карточка
  if (gridItems?.length === 1) {
    gridItems[0].parentElement.style.position = "absolute";
    gridItems[0].parentElement.style.top = "0px";
    gridItems[0].parentElement.style.left = "0px";
    grid.style.height = `${gridItems[0].clientHeight}px`;
    return;
  }

  // Если карточек меньше, чем колонок
  // if (gridItems?.length < columnNumber) {
  //   gridItems[0].parentElement.style.top = "0px";
  //   gridItems[0].parentElement.style.left = "0px";
  //   grid.style.height = `${gridItems[0].clientHeight}px`;
  //   return;
  // }

  let rowNumber = 0;
  let heightColumns = [];
  for (let i = 0; i < columnNumber; i++) {
    heightColumns.push(gridItems[i]?.clientHeight);
  }
  if (gridItems?.length > 1) {
    for (let i = 1; i < gridItems.length; i++) {
      rowNumber = Math.floor(i / columnNumber);
      gridItems[i].parentElement.style.position = "absolute";
      if (rowNumber === 0) {
        gridItems[i].parentElement.style.top = "0px";
        gridItems[i].parentElement.style.left = `${(columnWidth + gap) * (i % columnNumber)}px`;
      } else {
        const { high, numberColumn } = findHighColumn(heightColumns);
        gridItems[i].parentElement.style.top = `${high + gap}px`;
        gridItems[i].parentElement.style.left = `${(columnWidth + gap) * numberColumn}px`;
        heightColumns[numberColumn] += gap + gridItems[i].clientHeight;
      }
      if (i === gridItems.length - 1) {
        grid.style.height = `${findLowColumn(heightColumns)}px`;
        grid.style.overflow = "visible";
      }
    }
  }
}

// ИНИЦИАЛИЗАЦИЯ ПЛАВАЮЩЕЙ СЕТКИ
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    masonryInit(window.innerWidth);
  }, 300);
});

window.addEventListener('resize', () => {
  masonryInit(window.innerWidth);
});

  // console.log(gridItems)
//   const masonryInit = () => {
//     const grid = document.querySelector('.grid');
//     const containerWidth = grid.offsetWidth; // Получить ширину контейнера
// // Вычислить желаемую ширину столбца
//     const widthGrid =  (containerWidth - 8) / 2;
//     const masonry = new Masonry(grid, {
//       // options...
//       itemSelector: '.grid-item',
//       columnWidth: widthGrid,
//       gutter: 8,
//       transitionDuration: 0
//     });
//
//     const gridDesktop = document.querySelector('.grid-desktop');
//     const containerWidthDesktop = gridDesktop.offsetWidth; // Получить ширину контейнера
// // Вычислить желаемую ширину столбца
//     const widthGridDesktop =  (containerWidthDesktop - 64) / 5;
//     const masonryDesktop = new Masonry(gridDesktop, {
//       // options...
//       itemSelector: '.grid-item',
//       columnWidth: widthGridDesktop,
//       gutter: 16,
//       transitionDuration: 0
//     });
//   };
//
//   masonryInit();
//
//   const images = document.querySelectorAll('.grid-item img');
//   let loadedImages = 0; // Счетчик загруженных изображений
//
//   function checkLoad() {
//     loadedImages++;
//
//     if (loadedImages === images.length) { // Проверка, все ли изображения загружены
//       // Выполнить желаемое действие после загрузки всех изображений
//       // console.log('Все изображения загружены!');
//       masonryInit();
//     }
//   }
//
//   images.forEach(image => {
//     console.log(image)
//     image.addEventListener('load', checkLoad);
//   });