let closeActiveAnnotation = null;

document.querySelectorAll("[data-annotations]").forEach((group) => {
  const cards = [...group.querySelectorAll(".case-annotation")];
  const connector = group.querySelector(".case-connector path");
  const targets = cards.map((card) => document.getElementById(card.dataset.target));

  if (!connector || targets.some((target) => !target)) {
    console.error("Case study annotations require a connector and a target for each card.");
    return;
  }

  let active = null;

  function update() {
    targets.forEach((target, index) => {
      target.classList.toggle("case-annotation-target", index === active);
    });

    if (active === null || window.matchMedia("(max-width: 800px)").matches) {
      connector.removeAttribute("d");
      return;
    }

    const bounds = group.getBoundingClientRect();
    const target = targets[active];
    const rects = target.getClientRects();
    const start = rects[rects.length - 1];
    const end = cards[active].querySelector("summary").getBoundingClientRect();
    const body = group.querySelector(".case-body").getBoundingClientRect();
    const x1 = body.right - bounds.left;
    const y1 = start.top + start.height / 2 - bounds.top;
    const x2 = end.left - bounds.left;
    const y2 = end.top + end.height / 2 - bounds.top;
    const mid = x1 + (x2 - x1) / 2;
    connector.setAttribute("d", `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
  }

  cards.forEach((card, index) => {
    card.open = false;
    card.querySelector("summary").addEventListener("click", (event) => {
      event.preventDefault();
      const shouldOpen = !card.open;
      if (closeActiveAnnotation) closeActiveAnnotation();
      active = shouldOpen ? index : null;
      cards.forEach((item, itemIndex) => {
        item.open = itemIndex === active;
      });
      closeActiveAnnotation = shouldOpen ? () => {
        card.open = false;
        active = null;
        update();
        closeActiveAnnotation = null;
      } : null;
      update();
    });
  });

  window.addEventListener("resize", update);
  if ("ResizeObserver" in window) {
    new ResizeObserver(update).observe(group);
  }
});

const viewer = document.querySelector(".case-viewer");
if (viewer && typeof viewer.showModal === "function") {
  const image = viewer.querySelector(".case-viewer-image");
  const imageArea = viewer.querySelector(".case-viewer-image-area");
  const caption = viewer.querySelector(".case-viewer-caption");
  const zoomIn = viewer.querySelector(".case-viewer-zoom-in");
  const zoomOut = viewer.querySelector(".case-viewer-zoom-out");
  const close = viewer.querySelector(".case-viewer-close");

  if (!image || !imageArea || !caption || !zoomIn || !zoomOut || !close) {
    console.error("Case study image viewer is missing required elements.");
  } else {
    const zoomStep = 1.5;
    const maxZoom = 4;
    let zoomLevel = 1;

    function updateZoomControls() {
      const loaded = image.complete && image.naturalWidth > 0;
      zoomIn.setAttribute("aria-disabled", String(!loaded || zoomLevel >= maxZoom));
      zoomOut.setAttribute("aria-disabled", String(!loaded || zoomLevel <= 1));
      imageArea.classList.toggle("is-max-zoom", zoomLevel >= maxZoom);
    }

    function setZoom(level, point) {
      if (!image.complete || !image.naturalWidth) return;

      const areaRect = imageArea.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();
      const x = point?.x ?? areaRect.left + imageArea.clientWidth / 2;
      const y = point?.y ?? areaRect.top + imageArea.clientHeight / 2;
      const imageX = (x - imageRect.left) / imageRect.width;
      const imageY = (y - imageRect.top) / imageRect.height;
      const fitWidth = Math.min(
        image.naturalWidth,
        imageArea.clientWidth,
        imageArea.clientHeight * image.naturalWidth / image.naturalHeight
      );

      zoomLevel = Math.max(1, Math.min(maxZoom, level));
      imageArea.classList.toggle("is-zoomed", zoomLevel > 1);
      image.style.width = zoomLevel > 1 ? `${fitWidth * zoomLevel}px` : "";

      const newRect = image.getBoundingClientRect();
      imageArea.scrollLeft += newRect.left + imageX * newRect.width - x;
      imageArea.scrollTop += newRect.top + imageY * newRect.height - y;
      updateZoomControls();
    }

    document.querySelectorAll(".case-figure > a").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
            event.ctrlKey || event.shiftKey || event.altKey) return;

        const figure = link.closest("figure");
        const source = link.querySelector("img");
        const figureCaption = figure?.querySelector("figcaption");
        if (!source || !figureCaption) {
          console.error("Case study image viewer requires an image and caption.");
          return;
        }

        event.preventDefault();
        image.src = link.href;
        image.alt = source.alt;
        caption.textContent = figureCaption.textContent;
        imageArea.classList.remove("is-zoomed");
        imageArea.classList.remove("is-max-zoom");
        image.style.width = "";
        zoomLevel = 1;
        imageArea.scrollTop = 0;
        imageArea.scrollLeft = 0;
        updateZoomControls();
        viewer.showModal();
      });
    });

    image.addEventListener("load", updateZoomControls);
    image.addEventListener("error", () => {
      updateZoomControls();
      console.error("Case study image could not be loaded:", image.src);
    });
    image.addEventListener("click", (event) => {
      setZoom(zoomLevel * zoomStep, { x: event.clientX, y: event.clientY });
    });
    zoomIn.addEventListener("click", () => {
      if (zoomIn.getAttribute("aria-disabled") !== "true") setZoom(zoomLevel * zoomStep);
    });
    zoomOut.addEventListener("click", () => {
      if (zoomOut.getAttribute("aria-disabled") !== "true") setZoom(zoomLevel / zoomStep);
    });
    window.addEventListener("resize", () => {
      if (viewer.open && zoomLevel > 1) setZoom(zoomLevel);
    });

    close.addEventListener("click", () => viewer.close());
    document.addEventListener("keydown", (event) => {
      if (viewer.open && event.key === "Escape") {
        event.preventDefault();
        viewer.close();
      }
    });
    viewer.addEventListener("click", (event) => {
      if (event.target === viewer || event.target === imageArea) viewer.close();
    });
  }
}
