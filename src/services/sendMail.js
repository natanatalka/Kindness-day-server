var handlebars = require('handlebars');
var fs = require('fs');
var HTMLParser = require('node-html-parser');
var cheerio = require('cheerio');
const path = require('path');
const config = require('../../config/config');

let sendMail = (ctx, user) => {
    let result;
    var appDir = path.dirname(require.main.filename);
    let notSent = [];
    let url = `${config.app_protocol}://${config.app_host}`;
    fs.readFile(appDir + '/views/mails/register.html', 'utf8', function (err, html) {
        if (err) {
            throw err;
        }

        $ = cheerio.load(html.toString());
        $('#link').attr('href', `${url}/receiver/` + user.uniqueId);

        let data = {
            to: user.email,
            subject: `Hello, ${user.name}!`,
            html: $.html()
        };
        ctx.mailTransport.sendMail(data, function (error, response) {
            if (response) {
                result = response;
                console.log(response);
            }
            if (error) {
                notSent.push(user.name);
                // console.log(error);
                // return notSent;
            }
        });
    });
}


module.exports = sendMail;

