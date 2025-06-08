const getVaccinModel = (sequilize, { DataTypes }) => {
    const Vaccin = sequelize.define("user", {

    });

    Vaccin.associate = (models) => {
        Vaccin.hasOne(models.Address, {
            foreignKey: "ubsId",
            onDelete: "CASCADE",
        });
    }
}