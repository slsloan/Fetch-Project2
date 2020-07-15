module.exports = function (sequelize, DataTypes) {
        var Dogs = sequelize.define("Dogs", {
                image: DataTypes.STRING,
                first_name: DataTypes.STRING,
                last_name: DataTypes.STRING,
                breed: DataTypes.STRING,
                gender: DataTypes.STRING,
                age: DataTypes.STRING,
                fixed: DataTypes.BOOLEAN,
                latitude: {
                        type: DataTypes.DOUBLE(25, 14),
                        allowNull: false
                },
                longitude: {
                        type: DataTypes.DOUBLE(25, 14),
                        allowNull: false
                },
                interests: DataTypes.TEXT
        });
        return Dogs;
};
