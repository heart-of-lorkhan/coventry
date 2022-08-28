function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
  var mql = window.matchMedia(mediaQuery);
  mql.addListener(function (e) {
    return layoutChangedCallback(e.matches);
  });
  layoutChangedCallback(mql.matches);
}

export const scrollLock = () => {
  gsap.registerPlugin(ScrollTrigger);

  let container = document.querySelector(".section-timeline-container");

  installMediaQueryWatcher("(min-width: 768px)", function (matches) {
    if (matches) {
      gsap.to(container, {
        x: () =>
          -(container.scrollWidth - document.documentElement.clientWidth) +
          "px",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "center center",
          end: () => "+=" + container.offsetWidth,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      ScrollTrigger.refresh();

      gsap.registerPlugin(ScrollTrigger);
      gsap.to("progress", {
        value: 100,
        ease: "none",
        scrollTrigger: { scrub: 0.3 },
      });
    } else {
      gsap.killTweensOf(".section-timeline-container");
    }
  });
};
