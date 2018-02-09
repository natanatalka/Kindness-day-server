var path = require('path');

module.exports = (receiver) => {

    let receiverPhoto = (receiver.email).substring(0, (receiver.email).indexOf('@'));
    receiverPhoto = receiverPhoto + '.jpg';
    console.log(receiverPhoto);
    // let appDir1 = path.parse(appDir);
    // console.log(appDir1);
    let photoPath = '/users/' +  receiverPhoto;
    return photoPath;
}