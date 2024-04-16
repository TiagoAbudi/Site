AOS.init();
window.addEventListener("scroll", function () {
  let header = document.querySelector("#tab");
  header.classList.toggle("rolagem", this.window.scrollY > 0);
});

let links = document.querySelectorAll('.js-link');
let sections = document.querySelectorAll('.sections-products')

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    let top = window.scrollY;
    let offset = section.offsetTop - 40;
    let heightSection = section.offsetHeight;
    let idSection = section.getAttribute('id');

    if (top >= offset && top < offset + heightSection) {
      links.forEach(link => {
        link.classList.remove('actived')

        document.querySelector(`header section a[href*='${idSection}']`).classList.add('actived');
      })
    }
  })
})
function scrollSection(event) {
  event.preventDefault()

  const href = event.currentTarget.getAttribute('href');
  const section = document.querySelector(href)

  const topSection = section.offsetTop - 40;

  window.scrollTo({
    top: topSection,
    behavior: "smooth"
  })
}
links.forEach(link => {
  link.addEventListener('click', scrollSection)
})