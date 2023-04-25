const jwt = require('jsonwebtoken');

module.exports.signToken = (user) => {
    const { _id, email, username } = user;
    const token = jwt.sign({ _id, email, username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    console.log(`Token signé pour ${username}`);

    return token;
}

module.exports.verifyToken = (token) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(`Token invalide`);
            return null;
        } else {
            console.log(`Token vérifié pour ${decoded.username}`);
            return decoded;
        }
    });
}