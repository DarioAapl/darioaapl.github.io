window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".layer").forEach((el, index) => {
    const depth = (index + 1) * 0.15; // Adjust parallax strength per layer
    el.style.transform = `translate(-50%, ${scrollY * depth}px)`;
  });
});
