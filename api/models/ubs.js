const getUbsModel = (sequilize, { DataTypes }) => {
    const Ubs = sequelize.define("ubs", {

    });

    Ubs.associate = (models) => {
        Ubs.hasOne(models.Address, {
            foreignKey: "personId",
            onDelete: "CASCADE",
        });
    }
}