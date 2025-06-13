const getVaccinCardModel = (sequelize, { DataTypes }) => {
    const VaccinCard = sequelize.define("vaccinCard", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    })

    VaccinCard.associate = (models) => {
        VaccinCard.belongsTo(models.User, { foreignKey: "userId" });
        VaccinCard.belongsToMany(models.Vaccin, {
            through: models.CardVaccin,
            foreignKey: "vaccinCardId",
            otherKey: "vaccinId",
        });
    };

    VaccinCard.findById = async function (id) {
        return await this.findByPk(id, {
            include: [this.associations.vaccins, this.associations.user],
        });
    }

    VaccinCard.findAllVaccinCards = async function () {
        return await this.findAll({
            include: [this.associations.vaccins]
        });
    };

    VaccinCard.findByUserId = async function (userId) {
        return await this.findOne({
            where: { userId },
            include: [this.associations.vaccins]
        });
    };

    VaccinCard.createCard = async function (data) {
        const { vaccinIds, ...cardData } = data;
        const card = await this.create(data);
        if (vaccinIds && Array.isArray(vaccinIds)) {
            await card.addVaccins(vaccinIds);
        }
        return card;
    }

    VaccinCard.updateCard = async function (id, data) {
        const { vaccinIds, ...cardData } = data;

        const card = await this.findByPk(id);
        if (!card) {
            throw new Error("VaccinCard not found");
        }

        await card.update(cardData);

        if (vaccinIds && Array.isArray(vaccinIds)) {
            await card.setVaccins(vaccinIds);
        }

        return card;
    };

    return VaccinCard;
}

export default getVaccinCardModel;