module.exports = function (sequelize, DataTypes) {
    var Dog = sequelize.define("Post", {
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        image: DataTypes.STRING
    });

    return Dog;
};
