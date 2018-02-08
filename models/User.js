module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.TEXT
        },
        isActive: {
            type: Sequelize.BOOLEAN
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        receiverId: {
            type: Sequelize.INTEGER
        },
        uniqueId: {
            type: Sequelize.INTEGER
        }
    });

    User.belongsTo(User, {as: 'receiver'});

    return User;
};