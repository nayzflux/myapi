module.exports.isValidEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email);
}

module.exports.isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9\-_\.]+$/
    return regex.test(username);
}