const getVaccinCardModel = (sequelize, { DataTypes }) => {
    const VaccinCard = sequelize.define("vaccinCard", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    })

    VaccinCard.associate = (models) => {
        VaccinCard.belongsTo(models.User);
        VaccinCard.belongsTo(models.Vaccin);
    };

    VaccinCard.findById = async function(id){
        return await this.findByPk(id);
    };

    VaccinCard.findAllVaccinCards = async function(){
        return await this.findAll();
    };

    VaccinCard.findByUserId = async function(userId){
        return await this.findOne({
            where: { userId }
        });
    };

    VaccinCard.createCard = async function(data){
        return await this.create(data);
    }
    return VaccinCard;
}

module.exports = getVaccinCardModel;