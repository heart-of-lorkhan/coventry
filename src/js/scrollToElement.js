import scrollToSmooth from "../../node_modules/scrolltosmooth/dist/scrolltosmooth.esm";

export function scrollToElement() {
  let smoothScroll = new scrollToSmooth("button", {
    targetAttribute: "data-scrollto",
    duration: 500,
    offset: ".header",
  });

  smoothScroll.init();
}
