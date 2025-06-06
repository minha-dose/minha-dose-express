const getUserModel = (sequilize, { DataTypes }) => {
    const User = sequelize.define("user", {

    });

    User.associate = (models) => {
        User.hasOne(models.Address, {
            foreignKey: "personId",
            onDelete: "CASCADE",
        });
    }
}