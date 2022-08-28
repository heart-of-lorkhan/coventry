import scrollToSmooth from "../../node_modules/scrolltosmooth/dist/scrolltosmooth.esm";

import scrollHeader from "./scrollHeader";
import { sliders } from "./sliders";
import { scrollLock } from "./scrollLock";
import "./animateDigit";

window.addEventListener(
  "load",
  () => {
    scrollHeader();

    const scrollButtons = document.querySelectorAll("[data-scrollto]");

    let smoothScroll = new scrollToSmooth("button", {
      targetAttribute: "data-scrollto",
      duration: 1000,
      offset: ".header",
      onScrollStart: () => {
        scrollButtons.forEach((button) => button.blur());
      },
    });

    smoothScroll.init();

    const scrollspyElements = document.querySelectorAll("[data-scrollspy]");

    function isAnyPartOfElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const windowWidth =
        window.innerWidth || document.documentElement.clientWidth;

      const vertInView =
        rect.top <= windowHeight && rect.top + rect.height >= 0;
      const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

      return vertInView && horInView;
    }

    window.addEventListener("scroll", () => {
      scrollspyElements.forEach((element) => {
        if (isAnyPartOfElementInViewport(element)) {
          const animationClass = element.dataset.scrollspy;
          element.classList.add("animate__animated");
          element.classList.add(animationClass);
        }
      });
    });

    scrollspyElements.forEach((element) => {
      if (isAnyPartOfElementInViewport(element)) {
        const animationClass = element.dataset.scrollspy;
        element.classList.add("animate__animated");
        element.classList.add(animationClass);
      }
    });

    sliders();
    scrollLock();

    if ($(".intro-title__list")) {
      setInterval(function () {
        var cur = $(".intro-title__list li.active");
        if (cur.index() == $(".intro-title__list li").length - 1) {
          cur.removeClass("active");
          $(".intro-title__list li:first").addClass("active");
        } else {
          cur.removeClass("active").next().addClass("active");
        }
      }, 2000);
    }

    $(".slider-experts .card .button").on("click", function () {
      $(this).parent().parent().parent().toggleClass("active");
    })

  },
  false
);

$(document).ready(function () {
  let slideVideos = $("[data-video]");
  let videoUrls = [];

  slideVideos.each(function () {
    videoUrls.push($(this).data("video"));
  });

  const videoUrlsLength = videoUrls.length;
  let myPlayer;
  let currentSlideIndex;

  $(".card__video-thumb").on("click", function() {
    currentSlideIndex = $(this).data("video-index");
  });

  $(".slider-experts .card__video-thumb").magnificPopup({
    type: "inline",
    closeOnBgClick: false,
    items: {
      src: `
            <div class="mfp-close"></div>
            <video id="modal-video" class="video-js modal-video">
              <source src='#' type="video/mp4"></source>
            </video>`,
    },
    closeMarkup: `<svg width="38" height="38" viewBox="0 0 38 38"><g data-name="Group 544"><path data-name="Rectangle 147" d="M0 0h38v38H0z"/><g data-name="Group 543" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2"><path data-name="Line 49" d="m9.5 9.5 19 19"/><path data-name="Line 50" d="m28.5 9.5-19 19"/></g></g></svg>`,
    gallery: {
      enabled: true,
    },
    callbacks: {
      open: function () {
        myPlayer = videojs("modal-video", {
          autoplay: true,
          controlBar: {
            pictureInPictureToggle: false,
            fullscreenToggle: false,
          },
          controls: true,
          preload: "auto",
          closeBtnInside: true,
          showCloseBtn: true,
        });

        myPlayer.src({
          type: "video/mp4",
          src: videoUrls[currentSlideIndex],
        });

        var skipBehindButton = myPlayer.controlBar.addChild("button");
        var skipBehindButtonDom = skipBehindButton.el();
        skipBehindButtonDom.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="22.088" height="20.143" viewBox="0 0 22.088 20.143"><g data-name="Group 538"><path data-name="Polygon 4" d="m15.496 3.805-.008 15.238-13.183-7.611Z" fill="#fff"/><path data-name="Line 46" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2" d="M1 3.973v15.17"/></g></svg>';
        skipBehindButton.addClass("vjs-prev-video-button");

        skipBehindButtonDom.onclick = function () {
          currentSlideIndex =
            currentSlideIndex === 0
              ? videoUrlsLength - 1
              : currentSlideIndex - 1;
          myPlayer.src({
            type: "video/mp4",
            src: videoUrls[currentSlideIndex],
          });
        };

        var skipAheadButton = myPlayer.controlBar.addChild("button");
        var skipAheadButtonDom = skipAheadButton.el();
        skipAheadButtonDom.innerHTML =
          '<svg data-name="Group 537" xmlns="http://www.w3.org/2000/svg" width="22.088" height="20.143" viewBox="0 0 22.088 20.143"><path data-name="Polygon 4" d="m6.591 3.806 13.192 7.626L6.6 19.042Z" fill="#fff"/><path data-name="Line 46" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2" d="M21.088 3.973v15.17"/></svg>';
        skipAheadButton.addClass("vjs-next-video-button");

        skipAheadButtonDom.onclick = function () {
          currentSlideIndex =
            currentSlideIndex === videoUrlsLength - 1
              ? 0
              : currentSlideIndex + 1;
          myPlayer.src({
            type: "video/mp4",
            src: videoUrls[currentSlideIndex],
          });
        };

        $(".mfp-close").on("click", function () {
          $.magnificPopup.close();
        });
      },
      close: function () {
        if (myPlayer) {
          myPlayer.dispose();
        }
      },
    },
  });
});