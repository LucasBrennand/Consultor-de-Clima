# 🌦️ Consultor de Clima

Um aplicativo web simples e funcional que permite aos usuários consultar informações de endereço e condições climáticas atuais de qualquer localidade no Brasil a partir de um CEP.

### ➡️ [Acesse a demonstração ao vivo aqui!](https://lbconsultorclima.netlify.app/)

## 📸 Screenshot

![Screenshot da aplicação](https://i.imgur.com/RScTWaO.png)


## ✨ Funcionalidades

-   **Consulta por CEP:** Busca de informações de endereço (logradouro, bairro, cidade, estado) através da API do ViaCEP.
-   **Previsão do Tempo:** Exibe as condições climáticas atuais da localidade encontrada, incluindo:
    -   Temperatura em Celsius (°C)
    -   Sensação térmica
    -   Umidade
    -   Velocidade do vento
    -   Descrição do céu (ex: céu limpo, nuvens dispersas)
-   **Favoritos:** Permite salvar, visualizar e remover localidades favoritas, com os dados armazenados no `localStorage` do navegador.

## 🚀 Tecnologias Utilizadas

#### **Frontend**

-   HTML5
-   CSS3
-   JavaScript (Vanilla JS)

#### **Backend (Serverless)**

-   Node.js
-   Express.js
-   **Pacotes:** `axios`, `cors`, `serverless-http`

#### **APIs Externas**

-   [ViaCEP](https://viacep.com.br/): Para consulta de endereços a partir do CEP.
-   [OpenWeatherMap](https://openweathermap.org/api): Para consulta de dados climáticos.

#### **Hospedagem e Deploy**

-   **Plataforma:** [Netlify](https://www.netlify.com/)
-   **Infraestrutura:** Funções Serverless (Netlify Functions) para o backend e hospedagem estática para o frontend.

## 🛠️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento.

#### **Pré-requisitos**

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [Netlify CLI](https://docs.netlify.com/cli/get-started/) instalado globalmente: `npm install -g netlify-cli`

#### **Passos**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git)
    git clone [https://github.com/LucasBrennand/Consultor-de-Clima](https://github.com/LucasBrennand/Consultor-de-Clima)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd NOME_DO_SEU_REPOSITORIO
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo chamado `.env` na raiz do projeto.
    -   Adicione sua chave da API do OpenWeatherMap a este arquivo, como no exemplo abaixo:
    ```
    VITE_WEATHER_API_KEY=SUA_CHAVE_SECRETA_AQUI
    ```

5.  **Inicie o servidor de desenvolvimento da Netlify:**
    ```bash
    netlify dev
    ```
    -   O comando `netlify dev` irá iniciar um servidor local (geralmente em `http://localhost:8888`) que simula o ambiente da Netlify, executando tanto o frontend quanto as funções do backend.

## 📂 Estrutura de Arquivos

O projeto está organizado da seguinte forma para otimizar o deploy na Netlify:
