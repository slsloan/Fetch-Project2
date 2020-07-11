module.exports = function (sequelize, DataTypes) {
<<<<<<< HEAD
    var Dog = sequelize.define("Post", {
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        image: DataTypes.STRING
    });

=======
    var Dog = sequelize.define("Dog", {
        // image: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        breed: DataTypes.STRING,
        gender: DataTypes.STRING,
        age: DataTypes.STRING,
        fixed: DataTypes.STRING,
        // location: DataTypes.INTEGER,
        interests: DataTypes.TEXT
    });
>>>>>>> 9812736f56639a30c1c8466f4659bb5e4c3a9ed1
    return Dog;
};