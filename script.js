document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelectorAll(".parallax").forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    const top = parseFloat(getComputedStyle(el).top || 0);
    const offsetY = top + scrollY * speed;
    el.style.transform = `translate(-50%, ${offsetY}px)`;
  });
});

