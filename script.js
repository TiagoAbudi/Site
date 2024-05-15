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
  campoNome.focus()
}

btns.forEach(btn => {
  btn.addEventListener('click', getSection)
})

function getFieldValues(event) {
  event.preventDefault()

  // FAZER A CHAMADA PARA A API COM ESSAS VARIAVEIS PARA SALVAR NO BANCO E GRAVAR NA TELA NOVA
  const apiUrl = 'https://api.solumobi.com.br/teste/api/contatos-site';
  const values = {
    nome_completo: campoNome.value,
    email: campoEmail.value,
    produto: campoProduto.value,
    mensagem: campoMensagem.value,
  }
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGVzY3JpY2FvIjoic2l0ZSIsImlhdCI6MTcxNDc0NzY0OH0.Qvg5vy4uH2HqhBySbGYQqNBPwyz18odbYQ4OgGXyCT8'

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(values)
  };

  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      outputElement.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error

        ('Error:', error);
    });
}

btnEnvia.addEventListener('click', getFieldValues)


// let next = document.querySelector('.next')
// let prev = document.querySelector('.prev')

// next.addEventListener('click', function () {
//   let items = document.querySelectorAll('.item')
//   document.querySelector('.slide').appendChild(items[0])
// })

// prev.addEventListener('click', function () {
//   let items = document.querySelectorAll('.item')
//   document.querySelector('.slide').prepend(items[items.length - 1])
// })