const passwordHash = require('password-hash');
const db = require('../../models/index');
const Sequelize = require('sequelize');
const index = require('../index.js');
// const jws =


class LoginController {

    // async index(ctx) {
    //     return await ctx.render('login/index', {
    //         error: ''
    //     })
    // }

    async signup(ctx) {
        let {Admin} = db;
        var body = ctx.request.body;
        let hashedPass = passwordHash.generate(body.password);
        await Admin.create({username: body.username, password: hashedPass});
        ctx.ok({
            message: `Admin ${body.username} was added`,
        });
    }

    async logout(ctx) {
        ctx.session = null;
        return await ctx.render('login/index', {
            error: ''
        });
    }

    async login(ctx) {
        const errorMessage = 'Incorrect username of password';
        let {Admin} = db;
        const body = ctx.request.body;
        const user = await Admin.findOne({where: {username: body.username}});
        if (user) {
            if (passwordHash.verify(body.password, user.password)) {
                ctx.session.login = true;
                ctx.session.userId = user.id;
                ctx.ok({
                    tokem: '',
                    message: 'User is logged in'
                });
                ctx.redirect('/users');
            }
            else {
                ctx.send(401,{
                    message: errorMessage
                });
            }
        }
        else {
            ctx.send(401, {
                message: errorMessage
            });
        }
    }
}

module.exports = LoginController;
