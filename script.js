const jumper = document.getElementById("jumper");
const balloon = document.getElementById("balloon");

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  if (jumper) {
    jumper.style.transform =
      `translate(-50%, ${-y * 0.6}px)`;
  }

  if (balloon) {
    balloon.style.transform =
      `translateY(${-y * 0.25}px)`;
  }
});
