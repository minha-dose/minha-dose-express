const getUbsVaccinModel = (sequelize, { DataTypes }) => {
    return sequelize.define("UbsVaccin", {}, { timestamps: false });
};

module.exports = getUbsVaccinModel;