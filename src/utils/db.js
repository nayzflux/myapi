const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connexion à MongoBD effectué avec succès");
    }).catch(() => {
        console.log("Echec de la connexion à MongoBD");
    });