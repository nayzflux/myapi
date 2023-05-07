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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}