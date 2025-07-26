const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
const cep = document.querySelector("#cep")
const bairro = document.querySelector("#bairro")
const cidade = document.querySelector("#cidade")
const estado = document.querySelector("#estado")
const logradouro = document.querySelector("#lougradouro")

searchBtn.addEventListener("click", (event) => {
    getAddress(event)
})

getAddress = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/endereco/${searchInput.value}`)
    // fetch(`http://localhost:3000/endereco/51021040`)
  .then(res => res.json())
  .then(data => {
    cep.textContent = data.cep
    logradouro.textContent = data.logradouro
    bairro.textContent = data.bairro
    estado.textContent = data.estado
    // cidade.textContent = data.cidade
    console.log(data)
});
}


