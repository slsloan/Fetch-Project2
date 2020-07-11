module.exports = function (sequelize, DataTypes) {
    const Dogs = sequelize.define("Dogs", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: DataTypes.STRING,
        gender: DataTypes.STRING,
        location_longitutde: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        location_latitude: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        profile_url: DataTypes.STRING
    });

    return Dogs;
};
