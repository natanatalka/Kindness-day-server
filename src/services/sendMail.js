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
    let url = `${ctx.protocol}://${ctx.host}`;
    fs.readFile(appDir + '/views/mails/register.html', 'utf8', function (err, html) {
        if (err) {
            throw err;
        }

        $ = cheerio.load(html.toString());
        console.log(`${config.url}/receiver/` + user.uniqueId);
        $('#link').attr('href', `${config.url}/receiver/` + user.uniqueId);

        let data = {
            to: user.email,
            subject: `Hello, ${user.name}!`,
            html: $.html()
        };
        ctx.mailTransport.sendMail(data, function (error, response) {
            if (response) {
                result = response;
                console.log(response);
                $('#link').attr('href', '');
            }
            if (error) {
                notSent.push(user.name);
            }
        });
    });
}


module.exports = sendMail;

