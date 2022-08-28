import Swiper from "../../node_modules/swiper/swiper-bundle";

export const sliders = () => {
  const sliderExperts = new Swiper(".slider-experts", {
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    spaceBetween: 60,
    breakpoints: {
      960: {
        slidesPerView: 2,
        centeredSlides: false,
      },
      1440: {
        slidesPerView: 3,
        draggable: false,
        allowTouchMove: false,
        loop: false,
        navigation: false,
        pagination: false,
      },
    },
  });

  const sliderValues = new Swiper(".slider-values", {
    autoplay: {
      delay: 3000,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });

  const sliderJobs = new Swiper(".slider-jobs", {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
};
