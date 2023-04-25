const email = "nino.belaoud@gmail.co"
const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
console.log(regex.test(email));