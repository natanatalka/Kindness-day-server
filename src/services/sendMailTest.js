var api_key = 'key-71821839d94b12c6032615a5549ee6b1';
var domain = null;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
    from: 'Mailgun Sandbox <postmaster@sandboxef2bda7c42c14622a485f347aaa6c3ca.mailgun.org>',
    to: 'nsavchak@softjourn.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, function (error, body) {
    console.log(body);
});