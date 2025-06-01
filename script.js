document.addEventListener("mousemove", (e) => {
  const layers = document.querySelectorAll(".parallax-layer");
  layers.forEach((layer, index) => {
    const speed = (index + 1) * 0.5;
    const x = (window.innerWidth / 2 - e.pageX) * speed / 100;
    const y = (window.innerHeight / 2 - e.pageY) * speed / 100;
    layer.style.transform = `translate(${x}px, ${y}px)`;
  });
});
