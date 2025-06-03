document.addEventListener("mousemove", (e) => {
  const layers = document.querySelectorAll(".layer");
  layers.forEach((layer, index) => {
    const speed = (index + 1) * 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    layer.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  });
});
