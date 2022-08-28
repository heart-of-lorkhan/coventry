const detectCollision = (rect1, rect2) => {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  }

  return false;
};

export const scrollHeader = () => {
  const header = document.querySelector(".header");
  const apply = document.querySelector(".button-apply");
  const form = document.querySelector(".footer");
  const pageWrapper = document.querySelector(".page-wrapper");
  const headerHeight = header.offsetHeight;
  let formRect = form.getBoundingClientRect();
  let applyRect = apply.getBoundingClientRect();
  let hasCollisionApply = detectCollision(applyRect, formRect);

  // add padding top to header because of fixed header
  pageWrapper.style.paddingTop = `${headerHeight}px`;

  const hideOnCollision = (element, classname) =>
    element.classList.add(classname);
  const showOutOfCollision = (element, classname) =>
    element.classList.remove(classname);

  if (window.innerWidth < 1024) {
    window.addEventListener("scroll", () => {
      setTimeout(function () {
        formRect = form.getBoundingClientRect();
        applyRect = apply.getBoundingClientRect();
        hasCollisionApply = detectCollision(applyRect, formRect);

        let scrolledToBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight;

        if (hasCollisionApply) {
          hideOnCollision(apply, "animate__fadeOutDown");
          hideOnCollision(apply, "animate__animated");
          apply.classList.remove("no-focus");
        } else if (!scrolledToBottom) {
          showOutOfCollision(apply, "animate__fadeOutDown");
          showOutOfCollision(apply, "animate__animated");
          apply.classList.add("no-focus");
        }
      }, 1000);
    });
  }

  window.addEventListener("resize", () => {
    const headerHeight = header.offsetHeight;
    pageWrapper.style.paddingTop = `${headerHeight}px`;
  });
};

export default scrollHeader;
