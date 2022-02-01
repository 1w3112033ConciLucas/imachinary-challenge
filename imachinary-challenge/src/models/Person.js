const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('person', {
        name: {
            type: DataTypes.STRING,
            },
        lastName: {
            type: DataTypes.STRING,
            },
        age: {
            type: DataTypes.INTEGER,
            },
    });
}