const jws = require('jws');
const config = require('../../config/config');

module.exports = async(ctx, next) => {
    let token = ctx.header.authorization;
    if(token) {
        token = token.replace('Bearer ', '');
        if(jws.verify(token, 'HS256', config.secret)){
            jws.decode(token);
            return await next();
        }
        else {
            ctx.send(401, 'Authorization token is not valid');
        }
    }
    else {
        ctx.send(401, 'No authorization token was provided')
    }
};

