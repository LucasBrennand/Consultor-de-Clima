const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
const cep = document.querySelector("#cep")
const bairro = document.querySelector("#bairro")
const cidade = document.querySelector("#cidade")
const estado = document.querySelector("#estado")
const logradouro = document.querySelector("#lougradouro")
const localidade = document.querySelector("#localidade")
const sensacao = document.querySelector("#sensacao")
const umidade = document.querySelector("#umidade")
const vento = document.querySelector("#vento")
const celsiusValue = document.querySelector("#celsius")

const WEATHERAPIKEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log('Chave da API:', WEATHERAPIKEY);


searchBtn.addEventListener("click", (event) => {
    getAddress(event)
    searchInput.value = ''
})

const getAddress = async (event) => {
    event.preventDefault()
    await fetch(`http://localhost:3000/endereco/${searchInput.value}`)
    // fetch(`http://localhost:3000/endereco/51021040`)
  .then(res => res.json())
  .then(data => {
    cep.textContent = data.cep
    logradouro.textContent = data.logradouro
    bairro.textContent = data.bairro
    estado.textContent = data.estado
    localidade.textContent = data.localidade
    // cidade.textContent = data.cidade
    console.log(data)
    getCity(event, localidade.textContent)

    
});
}
const getCity = async (event, localidadeID) => {
  event.preventDefault
  await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${localidadeID}&limit=5&appid=${WEATHERAPIKEY}`)
  .then(res => res.json())
  .then(data => {
    console.log(`Latitude: ${data[0].lat}, Longitude: ${data[0].lon}`)
    getWeather(event, data[0].lat, data[0].lon)
});
}

const getWeather = async (event, lat, lon) => {
  event.preventDefault()
await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHERAPIKEY}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let celsius = parseFloat(data.main.temp - 273.15)
    sensacao.textContent = celsius.toFixed(2)
    umidade.textContent = data.main.humidity
    vento.textContent = data.wind.speed
    celsiusValue.textContent = celsius.toFixed(2)
});
}


