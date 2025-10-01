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
        Vaccin.belongsToMany(models.VaccinCard, {
            through: models.CardVaccin,
            foreignKey: "vaccinId",
            otherKey: "vaccinCardId",
        });

        Vaccin.hasMany(models.Appointment, {
            foreignKey: "vaccinId",
            onDelete: "CASCADE"
        })
    };

    Vaccin.findById = async function (id) {
        return await this.findByPk(id, {
            include: [this.associations.ubs],
        });
    }

    Vaccin.findAllVaccins = async function () {
        return await this.findAll({
            include: [this.associations.ubs],
        });
    }

    Vaccin.createVaccin = async function (data) {
        const { ubsIds, ...vaccinData } = data;

        const vaccin = await this.create(vaccinData);

        if (ubsIds && Array.isArray(ubsIds)) {
            await vaccin.addUbs(ubsIds);
        }

        return vaccin;
    };

    Vaccin.findVaccinByName = async function (name) {
        return await this.findOne({
            where: { name },
            include: [
                {
                    model: sequelize.models.Ubs,
                    through: { attributes: [] }
                }
            ]
        });
    };

    Vaccin.deleteById = async function (id) {
        const vaccin = await this.findByPk(id);
        if (!vaccin) return null;
        await vaccin.destroy();
        return vaccin;
    }

    return Vaccin;
}

export default getVaccinModel;