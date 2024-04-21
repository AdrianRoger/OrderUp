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

const router = require('./routes/index');
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em:  http://localhost:${PORT}`);
});

module.exports = router;
//não esquecer de continuar, precisa fazer as router para continuar