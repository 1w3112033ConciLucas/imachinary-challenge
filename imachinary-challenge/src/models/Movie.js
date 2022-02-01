const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('movie', {
        title: {
            type: DataTypes.STRING,
            },
        year: {
            type: DataTypes.STRING,
            },
    });
}