// Seulement pour le dév
try {
    require('dotenv').config({ path: '.env' });
} catch (err) {
    console.log("Impossible de chargée les variables de développement");
}

require('./utils/db');

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');

const app = express();
const server = http.createServer(app);

app.use(rateLimit({ windoMs: 15 * 60 * 1000, max: 50 }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

server.listen(process.env.PORT || 80, () => console.log("API démarré sur le port : " + process.env.PORT || 80));

require('./utils/socket').createWebsocket(server)