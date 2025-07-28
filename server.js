import express from "express";
import axios from "axios";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3000;

const WEATHERAPIKEY = process.env.VITE_WEATHER_API_KEY;

app.use(cors());

app.get("/endereco/:cep", async (req, res) => {
  const { cep } = req.params;
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao consultar o CEP", detalhes: error.message });
  }
});

app.get("/clima/:cep", async (req, res) => {
  const { cep } = req.params;

  try {
    const addressResponse = await axios.get(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    const addressData = addressResponse.data;

    if (addressData.erro) {
      return res.status(404).json({ erro: "CEP não encontrado" });
    }

    const localidadeID = addressData.localidade;

    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${localidadeID}&limit=1&appid=${WEATHERAPIKEY}`
    );
    const lat = geoResponse.data[0].lat;
    const lon = geoResponse.data[0].lon;

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHERAPIKEY}`
    );
    const weatherData = weatherResponse.data;

    res.json({
      endereco: addressData,
      clima: weatherData,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        erro: "Erro ao processar a solicitação",
        detalhes: error.message,
      });
  }
});

app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
