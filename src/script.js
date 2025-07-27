const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const cep = document.querySelector("#cep");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");
const logradouro = document.querySelector("#lougradouro");
const localidade = document.querySelector("#localidade");
const sensacao = document.querySelector("#sensacao");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");
const celsiusValue = document.querySelector("#celsius");
const nuvens = document.querySelector("#nuvens");
const favoritesList = document.querySelector(".favorites-list");
const saveBtn = document.querySelector("#save-btn");

try{


const WEATHERAPIKEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log("Chave da API:", WEATHERAPIKEY);

const getStorage = JSON.parse(localStorage.getItem("favorites")) || [];

let favoritesArray = [];
if (getStorage != null) {
  for (let i of getStorage) {
    let newItem = document.createElement("li");
    favoritesList.appendChild(newItem);
    newItem.innerHTML = i
    favoritesArray.push(i)
  }
  console.log(getStorage);
}

searchBtn.addEventListener("click", (event) => {
  getAddress(event);
  searchInput.value = "";
});

saveBtn.addEventListener("click", () => {
  //  console.log(`${cep.textContent}, ${bairro.textContent},${estado.textContent}`)
  if (cep.textContent) {
    saveItemFavorites(
      cep.textContent,
      bairro.textContent,
      localidade.textContent,
      estado.textContent
    );
  }
});

const saveItemFavorites = (cep, bairro, cidade, estado) => {
  let newItem = document.createElement("li");
  favoritesList.appendChild(newItem);
  newItem.innerHTML = `
  <p>${cep}, ${bairro} - ${cidade}, ${estado}</p>
                        <div class="favorites-btn-container">
                            <button>Exibir</button>
                            <button>Remover</button>
                        </div>
  `;
  let storageItem = newItem.innerHTML;
  favoritesArray.push(storageItem);
  console.log(favoritesArray)
  localStorage.setItem("favorites", JSON.stringify(favoritesArray));
};

const getAddress = async (event) => {
  event.preventDefault();
  await fetch(`http://localhost:3000/endereco/${searchInput.value}`)
    // fetch(`http://localhost:3000/endereco/51021040`)
    .then((res) => res.json())
    .then((data) => {
      cep.textContent = data.cep;
      logradouro.textContent = data.logradouro;
      bairro.textContent = data.bairro;
      estado.textContent = data.estado;
      localidade.textContent = data.localidade;
      // cidade.textContent = data.cidade
      console.log(data);
      getCity(event, localidade.textContent);
    });
};
const getCity = async (event, localidadeID) => {
  event.preventDefault;
  await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${localidadeID}&limit=5&appid=${WEATHERAPIKEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(`Latitude: ${data[0].lat}, Longitude: ${data[0].lon}`);
      getWeather(event, data[0].lat, data[0].lon);
    });
};

const getWeather = async (event, lat, lon) => {
  event.preventDefault();
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHERAPIKEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let celsius = parseFloat(data.main.temp - 273.15);
      sensacao.textContent = `${(
        data.main.feels_like.toFixed(2) - 273.15
      ).toFixed(1)} °C`;
      umidade.textContent = data.main.humidity;
      vento.textContent = data.wind.speed;
      nuvens.textContent = data.weather[0].description;
      celsiusValue.textContent = `${celsius.toFixed(1)} °C`;
    });
};

favoritesList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON"){
    const listItem = event.target.closest("li");
    const itemHTML = listItem.innerHTML;
    favoritesArray = favoritesArray.filter((item) => item != itemHTML)
    listItem.remove()
    localStorage.setItem("favorites", JSON.stringify(favoritesArray))
  }
})
}
catch(error){
  console.log('Error: ',error)
}
