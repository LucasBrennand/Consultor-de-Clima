const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const { VITE_WEATHER_API_KEY } = process.env;

app.use(cors());
app.use(express.json());

router.get('/clima/:cep', async (req, res) => {
  console.log("✅ Função '/clima' iniciada com sintaxe CommonJS.");
  const { cep } = req.params;

  if (!VITE_WEATHER_API_KEY) {
    console.error("❌ ERRO CRÍTICO: A variável de ambiente VITE_WEATHER_API_KEY não foi encontrada!");
    return res.status(500).json({ erro: 'A chave da API do clima não foi configurada no servidor.' });
  }

  try {
    console.log(`1. Buscando endereço para o CEP: ${cep}`);
    const addressResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = addressResponse.data;

    if (addressData.erro) {
      console.warn(`CEP ${cep} não encontrado no ViaCEP.`);
      return res.status(404).json({ erro: 'CEP não encontrado' });
    }

    const localidadeID = addressData.localidade;
    console.log(`2. Endereço encontrado: ${localidadeID}. Buscando coordenadas.`);

    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${localidadeID}&limit=1&appid=${VITE_WEATHER_API_KEY}`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      console.error(`❌ ERRO: OpenWeatherMap não encontrou coordenadas para a cidade: ${localidadeID}`);
      return res.status(404).json({ erro: `Não foi possível encontrar as coordenadas para a cidade: ${localidadeID}` });
    }

    const lat = geoResponse.data[0].lat;
    const lon = geoResponse.data[0].lon;
    console.log(`3. Coordenadas encontradas: Lat ${lat}, Lon ${lon}. Buscando clima.`);

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_WEATHER_API_KEY}`
    );
    const weatherData = weatherResponse.data;

    console.log("✅ Sucesso! Enviando resposta completa.");
    res.json({
      endereco: addressData,
      clima: weatherData
    });

  } catch (error) {
    console.error("❌ ERRO INESPERADO no bloco try/catch:", error.message);
    res.status(500).json({ erro: 'Ocorreu um erro inesperado no servidor.', detalhes: error.message });
  }
});

app.use('/.netlify/functions/api', router);

// A exportação também muda para o padrão CommonJS
module.exports.handler = serverless(app);