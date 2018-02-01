var handlebars = require('handlebars');
var fs = require('fs');
var HTMLParser = require('node-html-parser');
var cheerio = require('cheerio');
const path = require('path');

let sendMail = (ctx, user) => {
    var appDir = path.dirname(require.main.filename);
    fs.readFile(appDir + '/views/mails/register.html', 'utf8', function(err, html){
        if(err){
           throw err;
        }

        $ = cheerio.load(html.toString());
        $('#link').attr('href', 'http://localhost:5001/receiver/' + user.uniqueId);

        let data = {
            to: user.email,
            subject: `Hello, ${user.name}!`,
            html: $.html()
        };
        ctx.mailTransport.sendMail(data, function (error, response) {
            if (response) {
                ctx.ok();
            }
            if (error) {
                return ctx.throw(422, error)
            }
        });
    });
};

module.exports = sendMail;

