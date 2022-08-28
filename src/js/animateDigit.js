if ($(".counter-value").length) {
  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  var isCounterInView = false;
  var isCounterAnimated = false;
  var originalDigits = [];
  $(".counter-value").each(function (i, el) {
    originalDigits.push($(this).text());
    this.dataset.count = $(this).text().replace(/[.,]/g, "").match(/\d+/g);
  });

  var animateDigits = function animateDigits() {
    $(".counter-value").each(function (i, el) {
      var data = parseInt(this.dataset.count.match(/\d+/g), 10);
      var props = {
        from: {
          count: 0,
        },
        to: {
          count: data,
        },
      };
      $(props.from).animate(props.to, {
        duration: 1500 * 1,
        step: function (now) {
          $(el).text(Math.ceil(now));
        },
        complete: function () {
          $(el).text(originalDigits[i]);
        },
      });
    });
  };

  var reset = function reset() {
    if ($(".counter-value").isInViewport()) {
      isCounterInView = true;
    } else {
      isCounterInView = false;
      isCounterAnimated = false;
    }

    if (
      isCounterInView &&
      $(".counter-value").isInViewport() &&
      isCounterAnimated === false
    ) {
      animateDigits();
      isCounterAnimated = true;
    }
  };

  $(window).on("scroll", reset);
}
