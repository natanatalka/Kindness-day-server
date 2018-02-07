require('dotenv').config({path: __dirname +  '/../.env'});

console.log( __dirname +  '/../.env');
console.log(process.env.DB_HOST);

module.exports = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "mail":  process.env.EMAIL,
    "mailPassword": process.env.EMAIL_PASS,
    "service": "Gmail",
    "secret": "natanatanata"
};