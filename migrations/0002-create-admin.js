module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('Admins', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }

        });
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.dropTable('Admins');
    }
};
