module.exports = function (sequelize, DataTypes) {
    const Dogs = sequelize.define("Dogs", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: DataTypes.STRING,
        gender: DataTypes.STRING,
        longitude: {
            type: DataTypes.DOUBLE(25, 14),
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE(25, 14),
            allowNull: false
        },
        profile_url: DataTypes.STRING
    });

    return Dogs;
};
