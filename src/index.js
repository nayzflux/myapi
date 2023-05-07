// Seulement pour le dév
require('dotenv').config({ path: '.env' });

require('./utils/db');

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = http.createServer(app);


app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

server.listen(process.env.PORT || 80, () => console.log("API démarré sur le port : " + process.env.PORT || 80));

require('./utils/socket').createWebsocket(server)