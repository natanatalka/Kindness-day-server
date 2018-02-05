const passwordHash = require('password-hash');
const db = require('../../models/index');
const Sequelize = require('sequelize');
const index = require('../index.js');
const jws = require('jws');
const config = require('../../config/config');


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
    }

    async login(ctx) {
        const errorMessage = 'Incorrect username of password';
        let {Admin} = db;
        const body = ctx.request.body;
        const admin = await Admin.findOne({where: {username: body.username}});
        if (admin) {
            if (passwordHash.verify(body.password, admin.password)) {
                const token = jws.sign({
                    header: { alg: 'HS256' },
                    payload: {user: admin.username},
                    secret: config.secret
                });
                ctx.ok({
                    success: true,
                    message: 'User is successfully logged in!',
                    token: token
                });
            }
            else {
                ctx.send(401,{
                    success: false,
                    message: errorMessage
                });
            }
        }
        else {
            ctx.send(401, {
                success: false,
                message: errorMessage
            });
        }
    }
}

module.exports = LoginController;
