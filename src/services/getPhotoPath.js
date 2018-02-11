module.exports = (receiver) => {

    let receiverPhoto = (receiver.email).substring(0, (receiver.email).indexOf('@'));
    receiverPhoto = receiverPhoto + '.jpg';
    console.log(receiverPhoto);
    let photoPath = '/users-pics/' +  receiverPhoto;
    return photoPath;
}