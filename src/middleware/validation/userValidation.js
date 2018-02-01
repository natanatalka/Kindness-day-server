const db = require('../../../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require("email-validator");
const errors = require('./errors');

module.exports = async(ctx, next) => {
    let {User} = db;
    let email = ctx.request.body.email;
    let name = ctx.request.body.name;
    let users = await User.findAll({attributes: ['email']});
    let emails = users.map(u => u.email);
    let errorsArray = [];

    if(email==='') {
        errorsArray.push(errors.emailCannotBeBlank);
    }

    if(!validator.validate(email)){
        errorsArray.push(errors.emailIsNotValid);
    }

    if (name===''){
        errorsArray.push(errors.nameCannotBeBlank)
    }

    if(ctx.method==='POST') {
        if (emails.includes(email)) {
            errorsArray.push(errors.emailAlreadyExists)
        }
    }

    if (errorsArray.length != 0)
        ctx.send(422, errorsArray.map(msg => msg.message));
    else await next();
};
