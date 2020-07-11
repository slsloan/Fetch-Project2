module.exports = function (sequelize, DataTypes) {
    const Dogs = sequelize.define("Dogs", {
        name: DataTypes.STRING,
        breed: DataTypes.STRING,
        gender: DataTypes.STRING,
        location_longitutde: DataTypes.DECIMAL,
        location_latitude: DataTypes.DECIMAL,
        profile_url: DataTypes.STRING
    });

    return Dogs;
};
