const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('rol', {
        description: {
            type: DataTypes.STRING,
            },
    });
}