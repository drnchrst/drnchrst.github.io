const carousel = document.querySelector("#more-work-carousel");
const controls = document.querySelector(".carousel-controls");

if (carousel && controls) {
  const previous = controls.querySelector(".carousel-previous");
  const next = controls.querySelector(".carousel-next");

  if (previous && next) {
    const updateControls = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      previous.disabled = carousel.scrollLeft <= 1;
      next.disabled = carousel.scrollLeft >= maxScroll - 1;
      controls.hidden = maxScroll <= 1;
    };

    const move = (direction) => {
      const cards = Array.from(carousel.children);
      const current = cards.reduce((closest, card, index) =>
        Math.abs(card.offsetLeft - carousel.offsetLeft - carousel.scrollLeft) <
        Math.abs(cards[closest].offsetLeft - carousel.offsetLeft - carousel.scrollLeft) ? index : closest, 0);
      const target = cards[Math.max(0, Math.min(cards.length - 1, current + direction))];
      carousel.scrollTo({ left: target.offsetLeft - carousel.offsetLeft });
    };

    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    carousel.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    updateControls();
  }
}
