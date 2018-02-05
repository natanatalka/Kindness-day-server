// const User = require('../models/Users');
const db = require('../../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const hash = require('../services/hash');
const index = require('../index.js');
const csvParse = require('../services/parseCSV');
const uuid = require('uuid/v4');
const sendMail = require('../services/sendMail');
class UserController {

    async upload(ctx) {
        let {User} = db;
        let fileInfo = ctx.request.body.files.file;
        let file = fileInfo.path;
        let users = csvParse.parseFile(file);
        for (let i = 0; i < users.length; i++) {
            await User.create(
                {
                    name: users[i].name,
                    email: users[i].email,
                    group: users[i].group || '',
                    uniqueId: uuid()
                });
        }
        ctx.ok({
            message: 'Users are uploaded from file!'
        })
    }

    async mail(ctx) {
        let {User} = db;
        const user = await User.findById(ctx.params.id);
        if(user.isActive){
            sendMail(ctx, user);
        }
        else ctx.send(400, {message: 'User is inactive'})

    }

    async mails(ctx) {
        let {User} = db;
        const users = await User.findAll({attributes: ['name', 'email', 'uniqueId']});

        function send() {
            while (users.length != 0) {
                let i = users.length;
                let user = users.pop();
                (function (i)
                    {
                        setTimeout(() => sendMail(ctx, user), 5000*i);
                    })(i)
                }

            }
            send();
    }

    async index(ctx) {
        const {User} = db;
        const users = await User.findAll({
            include: [
                {model: User, as: 'receiver'}
            ]
        });

        ctx.ok(users.map(u => u.toJSON()));

        // return await ctx.render('users/index', {users: users.map(u => u.toJSON())})
    }

    async get(ctx) {
        const {User} = db;
        const user = await User.findById(ctx.params.id, {
            include: [
                {model: User, as: 'receiver'}
            ]
        });
        // console.log(user);
        if (!user) {
            return ctx.notFound(`Can't found user id:${ctx.params.id}`)
        }
        ctx.ok({
                data: user.toJSON()
        });
    }

    async create(ctx) {
        const {User} = db;
        let user = ctx.request.body;
        let createdUser;
        await User.create({
            name: user.name,
            email: user.email,
            isActive: 1,
            uniqueId: uuid()
        }).then(user => {
            createdUser = user;
        });
            ctx.ok({
                createdUser,
                message: `User ${user.name} was created`,
        });
    }


    async update(ctx) {
        const {User} = db;
        let userData = ctx.request.body;
        const user = await User.findById(ctx.params.id);
        await user.update({name: userData.name, email: userData.email, isActive: userData.isActive});
        ctx.ok({
            message: `User ${user.name} is updated`
        })
    }

    async changeStatus(ctx) {
        const {User} = db;
        const user = await User.findById(ctx.params.id);
        await user.update({isActive: !user.isActive});
        ctx.ok({
            message: 'Status is changed',
            status: user.isActive
        })
    }


    async delete(ctx) {
        const {User} = db;
        const user = await User.findById(ctx.params.id);

        if (!user) {
            return ctx.notFound(`Can't found user id:${ctx.params.id}`)
        }

        const result = await user.destroy();

        ctx.ok({
            message: 'User was deleted',
        });
    }


    async receiver(ctx) {
        const {User} = db;

        //get user by uniqueId
        const user = await User.findOne({where: {uniqueId: ctx.params.uniqueId}});

        if(!user) {
            ctx.throw(404, 'User not found')
        }

        //get all users with not null receiverId
        const usersWithNotNullReceiverIds = await User.findAll({where: Sequelize.and({receiverId: {[Op.ne]: null}})});

        //get only receiverId from all users with not null receiverId
        const receiverIdsArray = usersWithNotNullReceiverIds.map(u => u.receiverId);

        //get all users that are available to be set as gift receiver,
        // i.e. that are not already a gift receiver and excluding current user
        const availableIds = await User.findAll({where: Sequelize.and({id: {[Op.notIn]: receiverIdsArray}}, {id: {[Op.ne]: user.id}}, {isActive: '1'})});

        //get only ids of available users
        const usersIds = availableIds.map(u => u.id);

        if(usersIds.length===0) {
            ctx.throw(400, 'No available users')
        }

        //if user doesn't have a receiver yet then set a random user from available users
        let receiverId = user.receiverId;
        if (!user.receiverId) {
            receiverId = usersIds[Math.floor(Math.random() * usersIds.length)];
            await user.update({receiverId});
        }

        const receiver = await User.findOne({where: {id: receiverId}});

        if(!receiver) {
            ctx.throw(404, 'There is no user with such receiver id')
        }
        return await ctx.render('receiver/index', {receiver: receiver.name});

    }
}


module.exports = UserController;
