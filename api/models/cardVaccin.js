const getCardVaccinModel = (sequelize, { DataTypes }) => {
    return sequelize.define("CardVaccin", {}, { timestamps: false });
};
 
export default getCardVaccinModel;