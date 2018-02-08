module.exports = (sequelize, Sequelize) => {

    const Admin = sequelize.define('Admin', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.TEXT
        },
        password: {
            type: Sequelize.TEXT
        }
    });

    return Admin;
};