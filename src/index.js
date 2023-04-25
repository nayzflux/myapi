// Seulement pour le dév
require('dotenv').config({path: '.env'});

const express = require('express');

const app = express();

const routes = require('./routes');

app.use('/api/v1', routes);

app.listen(process.env.PORT || 80, () => console.log("API démarré sur le port : " + process.env.PORT || 80));