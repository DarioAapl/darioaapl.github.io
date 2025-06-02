window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelector(".layer1").style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.1}px))`;
  document.querySelector(".layer2").style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`;
  document.querySelector(".layer3").style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
});
