const UserController = require('../controllers/userController');
const LoginController = require('../controllers/loginController');
const Router = require('koa-router');
const route = new Router();
const auth = require('../middleware/auth');
const userController = new UserController();
const loginController = new LoginController();
const csvParse = require('../services/parseCSV');
const userValidation = require('../middleware/validation/userValidation');

route.get('/logout', async (ctx, next) => {
    await loginController.logout(ctx);
}, async (ctx) => {
});

route.post('/users/upload', async (ctx, next) => {
await userController.upload(ctx);
});

route.post('/signup', async (ctx) => {
    await loginController.signup(ctx);
} );

route.get('/admins', async (ctx) => {
   await loginController.index(ctx);
});

route.post('/login', async (ctx) => {
    await loginController.login(ctx);
});

route.get('/users', async (ctx) => {
    await userController.index(ctx);
});

route.get('/users/mails',  async (ctx) => {
    await userController.mails(ctx);
});

route.get('/users/mail/:id', async (ctx) => {
    await userController.mail(ctx);
})

route.get('/users/:id', async (ctx) => {
    await userController.get(ctx);
});

route.get('/user/new', async (ctx) => {
});

route.delete('/users/:id', async (ctx) => {
    await userController.delete(ctx);
});

route.get('/receiver/:uniqueId', async (ctx) => {
    await userController.receiver(ctx);
} );

route.del('/users/:id/receiver', async (ctx) => {
    await userController.deleteReceiver(ctx);
})

// route.get('/users/:id/status', auth, async (ctx) => {
//     await userController.changeStatus(ctx)
// });

route.post('/users', auth, userValidation, async (ctx) => {
    await userController.create(ctx)
});

route.put('/users/:id',userValidation, async (ctx) => {
    await userController.update(ctx)
});


module.exports = route;
