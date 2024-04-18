const express = require('express');
const cockieParser = require('cookie-parser');
const path = require('path');
const { corsMiddleware } = require('./middlewares');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(cockieParser());

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/index.js');
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em:  https://localhost:${PORT}`);
});

//não esquecer de continuar, precisa fazer as router para continuar