document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelectorAll(".parallax").forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    const offset = parseFloat(el.dataset.offset || 0);
    el.style.transform = `translate(-50%, ${offset + scrollY * speed}px)`;
  });
});
