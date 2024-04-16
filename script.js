AOS.init();
window.addEventListener("scroll", function () {
  let header = document.querySelector("#tab");
  header.classList.toggle("rolagem", this.window.scrollY > 0);
});
