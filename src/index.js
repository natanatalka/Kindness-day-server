const Koa = require('koa');
const views = require('koa-views');
const respond = require('koa-respond');
const serve = require('koa-static');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const nodemailer = require('nodemailer');
const session = require('koa-session');
const koaBody = require('koa-body');
const config = require('../config/config');
const router = require('./routes/routes');

app.use(cors({origin: '*',
    expose: ['Authorization'],
    headers: ['Content-Type', 'Authorization']}));

app.keys = ['drunk_nata'];

app.use(koaBody({ multipart: true }));

const transport = nodemailer.createTransport( {
    service: config.service,
    auth: {
        user: config.mail,
        pass: config.mailPassword
    }
});
app.use(session(app));
app.context.mailTransport = transport;
app.use(bodyParser());

app.use(respond());
app.use(serve(__dirname + '/../public'));

app.use(views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
}));

app
    .use(router.routes())
    .use(router.allowedMethods());


console.log(`App started ${config.app_protocol}://${config.app_host}:${config.app_port}`);
app.listen(config.app_port, config.app_host);