window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".layer").forEach((el, index) => {
    const depth = (index + 1) * 0.15;
    const maxOffset = 100;
    const offset = Math.min(scrollY * depth, maxOffset);
    el.style.transform = `translate(-50%, ${offset}px)`;
  });
});
