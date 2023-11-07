// Слайдер початок
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-dot");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");
const sliderPositionInfo = document.querySelector(".carousel-position");

let activeSlideIndex = 0;

const setSliderPositionInfo = () => {
  sliderPositionInfo.innerHTML = `${activeSlideIndex + 1} / ${slides.length}`;
};

const getInitSliderValue = () => {
  slides[activeSlideIndex].classList.add("active");
  dots[activeSlideIndex].classList.add("active");
  setSliderPositionInfo();
};
getInitSliderValue();

const handleChangeActiveSlide = (index) => {
  for (let slide of slides) {
    if (slide.classList.contains("active")) {
      slide.classList.remove("active");
    }
  }
  slides[index].classList.add("active");
  setSliderPositionInfo();
};

const handleChangeActiveDot = (index) => {
  for (let dot of dots) {
    if (dot.classList.contains("active")) {
      dot.classList.remove("active");
    }
  }
  dots[index].classList.add("active");
};

const handleNextSlide = () => {
  if (activeSlideIndex === slides.length - 1) {
    activeSlideIndex = 0;
  } else {
    activeSlideIndex++;
  }
  handleChangeActiveSlide(activeSlideIndex);
  handleChangeActiveDot(activeSlideIndex);
};

const handlePrevSlide = () => {
  if (activeSlideIndex === 0) {
    activeSlideIndex = slides.length - 1;
  } else {
    activeSlideIndex--;
  }
  handleChangeActiveSlide(activeSlideIndex);
  handleChangeActiveDot(activeSlideIndex);
};

nextBtn.addEventListener("click", handleNextSlide);
prevBtn.addEventListener("click", handlePrevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    activeSlideIndex = index;
    handleChangeActiveSlide(activeSlideIndex);
    handleChangeActiveDot(activeSlideIndex);
  });
});
// Слайдер кінець

// Акардіон початок

const accardionHeaders = document.querySelectorAll(".accordion-header");
const accardionContents = document.querySelectorAll(".accordion-content");

accardionHeaders.forEach((header, index) => {
  header.addEventListener("click", () => {
    if (header.classList.contains("active")) {
      header.classList.remove("active");
      accardionContents[index].classList.remove("active");
    } else {
      accardionHeaders.forEach((item, i) => {
        item.classList.remove("active");
        accardionContents[i].classList.remove("active");
      });
      header.classList.add("active");
      accardionContents[index].classList.add("active");
    }
    // header.classList.toggle("active");
    // accardionContents[index].classList.toggle("active");
  });
});

// Акардіон кінець

// Таби початок

const tabLinks = document.querySelectorAll(".tablinks");
const tabContents = document.querySelectorAll(".tabcontent");

tabLinks[0].classList.add("active");
tabContents[0].classList.add("show");

tabLinks.forEach((tabLink, index) => {
  tabLink.addEventListener("click", () => {
    tabLinks.forEach((item) => item.classList.remove("active"));
    tabContents.forEach((item) => item.classList.remove("show"));

    tabLinks[index].classList.add("active");
    tabContents[index].classList.add("show");
  });
});

// Таби кінець

// Бокове меню початок

const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("nav");
const menu = document.querySelector("#menu");
const links = document.querySelectorAll("a");

const handleChangeMenu = () => {
  menuButton.classList.toggle("active");
  menuButton.innerHTML = menuButton.classList.contains("active")
    ? "&#10006"
    : "&#9776;";

  nav.classList.toggle("active");
  menu.classList.toggle("active");
};

menuButton.addEventListener("click", handleChangeMenu);

links.forEach((link) => link.addEventListener("click", handleChangeMenu));

// Бокове меню кінець

// Переключення теми початок

const switcher = document.querySelector("#theme-switcher");

const darkThemeValue = !!localStorage.getItem("dark-theme");

if (darkThemeValue) {
  switcher.checked = true;
  document.body.classList.add("dark-theme");
}

switcher.addEventListener("change", (e) => {
  if (e.target.checked) {
    localStorage.setItem("dark-theme", e.target.checked);
  } else {
    localStorage.removeItem("dark-theme");
  }
  document.body.classList.toggle("dark-theme");
});

// Переключення теми кінець

// Генератор випадкового числа початок

const generateBtn = document.getElementById("generateBtn");
const minValue = document.getElementById("minValue");
const maxValue = document.getElementById("maxValue");
const postWrapper = document.querySelector(".post-wrapper");

const result = document.getElementById("result");

const getPost = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((data) => data.json())
    .then((result) => {
      postWrapper.innerHTML = `
      <p>PostID: ${result.id}</p>
      <p>PostID: ${result.title}</p>
      <p>PostID: ${result.body}</p>
      `;
    });
};

generateBtn.addEventListener("click", () => {
  const min = parseInt(minValue.value);
  const max = parseInt(maxValue.value);

  if (isNaN(min) || isNaN(max) || min > max) {
    result.innerHTML = "Введіть коректне значення";
  } else {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    result.innerHTML = randomNumber;
    getPost(randomNumber);
  }
});

// Генератор випадкового числа кінець

// Таймер зворотнього відрахунку початок

const timerStartBtn = document.getElementById("timer-start-btn");

const updateTimer = (timeLeft) => {
  const timer = document.getElementById("timer");
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  timer.innerHTML = `${minutes}:${seconds}`;
};

const startTimer = () => {
  const input = document.getElementById("minutes");
  const minutes = parseInt(input.value);

  if (isNaN(minutes) || minutes < 1) {
    alert("Введіть коректне значення");
  } else {
    let timeLeft = minutes * 60;
    const timerId = setInterval(() => {
      timeLeft--;

      updateTimer(timeLeft);

      if (timeLeft === 0) {
        clearInterval(timerId);
        alert("Таймер зупинено");
      }
    }, 1000);
  }
};

timerStartBtn.addEventListener("click", startTimer);

// Таймер зворотнього відрахунку кінець
