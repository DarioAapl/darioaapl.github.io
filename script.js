window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const heroImage = document.querySelector(".hero-image");
  heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
});
