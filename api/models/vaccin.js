const getVaccinModel = (sequelize, { DataTypes }) => {
    const Vaccin = sequelize.define("vaccin", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        batch: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    Vaccin.associate = (models) => {
        Vaccin.belongsToMany(models.Ubs, {
            through: models.UbsVaccin,
            foreignKey: "vaccinId",
            otherKey: "ubsId",
        });
        Vaccin.hasMany(models.VaccinCard, {
            foreignKey: "vaccinId",
            onDelete: "CASCADE",
        });
    };

    Vaccin.findById = async function (id) {
        return await this.findByPk(id);
    }

    Vaccin.findAllVaccins = async function () {
        return await this.findAll();
    }

    Vaccin.findVaccinByName = async function (name) {
        return await this.findOne({
            where: { name },
            include: [
                {
                    model: sequelize.models.Ubs,
                    through: { attributes: []}
                }
            ]
        });
    };

    return Vaccin;
}

module.exports = getVaccinModel;