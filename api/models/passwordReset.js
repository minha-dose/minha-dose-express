const getPasswordResetModel = (sequelize, {DataTypes}) => {
    const PasswordReset = sequelize.define("passwordReset", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expireAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    PasswordReset.associate = (models) => {
        PasswordReset.belongsTo(models.User, {
            foreignKey: "email",
            targetKey: "email",
            onDelete: "CASCADE",
        });
    };

    return PasswordReset;
}

export default getPasswordResetModel;