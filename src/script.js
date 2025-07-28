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

try {
  const getStorage = JSON.parse(localStorage.getItem("favorites")) || [];

  let favoritesArray = [];
  if (getStorage != null) {
    for (let i of getStorage) {
      let newItem = document.createElement("li");
      favoritesList.appendChild(newItem);
      newItem.innerHTML = i;
      const pText = newItem.querySelector("p").textContent;
      const cepValue = pText.split(",")[0];
      newItem.dataset.cep = cepValue;

      favoritesArray.push(i);
    }
  }

  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    fetchAndDisplayWeather(searchInput.value);
    searchInput.value = "";
  });

  saveBtn.addEventListener("click", () => {
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
    newItem.dataset.cep = cep;

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
    localStorage.setItem("favorites", JSON.stringify(favoritesArray));
  };

  const fetchAndDisplayWeather = async (cepValue) => {
    if (!cepValue) return;

    const cleanCep = cepValue.replace(/\D/g, "");

    await fetch(`http://localhost:3000/clima/${cleanCep}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          alert(data.erro);
          return;
        }
        cep.textContent = data.endereco.cep;
        logradouro.textContent = data.endereco.logradouro;
        bairro.textContent = data.endereco.bairro;
        estado.textContent = data.endereco.uf;
        localidade.textContent = data.endereco.localidade;

        let celsius = parseFloat(data.clima.main.temp - 273.15);
        sensacao.textContent = `${(data.clima.main.feels_like - 273.15).toFixed(
          1
        )} °C`;
        umidade.textContent = data.clima.main.humidity;
        vento.textContent = data.clima.wind.speed;
        nuvens.textContent = data.clima.weather[0].description;
        celsiusValue.textContent = `${celsius.toFixed(1)} °C`;
      })
      .catch((error) => console.log("Erro ao buscar dados: ", error));
  };

  favoritesList.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    const clickedButton = event.target;
    const listItem = clickedButton.closest("li");

    if (clickedButton.textContent === "Exibir") {
      const cepToDisplay = listItem.dataset.cep;
      fetchAndDisplayWeather(cepToDisplay);
    } else if (clickedButton.textContent === "Remover") {
      const itemHTML = listItem.innerHTML;
      favoritesArray = favoritesArray.filter((item) => item != itemHTML);
      listItem.remove();
      localStorage.setItem("favorites", JSON.stringify(favoritesArray));
    }
  });
} catch (error) {
  console.log("Error: ", error);
}
