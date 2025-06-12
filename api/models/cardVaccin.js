const getCardVaccinModel = (sequelize, { DataTypes }) => {
    return sequelize.define("CardVaccin", {}, { timestamps: false });
};
 
module.exports = getCardVaccinModel;