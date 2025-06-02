window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".layer").forEach((el, index) => {
    const depth = (index + 1) * 0.15;
    const maxOffset = 100 + index * 40; // Prevent going too far
    const translateY = Math.min(scrollY * depth, maxOffset);
    el.style.transform = `translate(-50%, ${translateY}px)`;
  });
});
