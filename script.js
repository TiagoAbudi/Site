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
    let offset = section.offsetTop - 39;
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

  const topSection = section.offsetTop - 39;

  window.scrollTo({
    top: topSection,
    behavior: "smooth"
  })
}

links.forEach(link => {
  link.addEventListener('click', scrollSection)
})

let btns = document.querySelectorAll('.btn-entrar-em-contato')
let btnEnvia = document.querySelector('#btn-enviar')
let campoNome = document.querySelector('#nome')
let campoProduto = document.querySelector('#input-product')
let campoEmail = document.querySelector('#email')
let campoMensagem = document.querySelector('#mensagem')

String.prototype.replaceAll = function (str1, str2, ignore) {
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}

function getSection(event) {
  event.preventDefault()
  campoProduto.setAttribute('value', event.target.getAttribute('id').substring(event.target.getAttribute('id').indexOf('-') + 1).replaceAll("-", " "));
}

btns.forEach(btn => {
  btn.addEventListener('click', getSection)
})

function getFieldValues(event) {
  event.preventDefault()
  let nome = campoNome.value
  let email = campoEmail.value
  let produto = campoProduto.value
  let mensagem = campoMensagem.value

  // FAZER A CHAMADA PARA A API COM ESSAS VARIAVEIS PARA SALVAR NO BANCO E GRAVAR NA TELA NOVA
}

btnEnvia.addEventListener('click', getFieldValues)


let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function () {
  let items = document.querySelectorAll('.item')
  document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function () {
  let items = document.querySelectorAll('.item')
  document.querySelector('.slide').prepend(items[items.length - 1])
})