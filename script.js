window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const heroHeight = document.querySelector(".hero-container").offsetHeight;

  document.querySelectorAll(".layer").forEach((el, index) => {
    const depth = (index + 1) * 0.15;
    const maxOffset = 80 + index * 40; // Prevents overscrolling
    const offset = Math.min(scrollY, heroHeight);
    const translateY = Math.min(offset * depth, maxOffset);
    el.style.transform = `translate(-50%, ${translateY}px)`;
  });
});
