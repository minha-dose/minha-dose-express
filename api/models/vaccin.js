import { Op, fn, col, where } from "sequelize";

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
    });

    Vaccin.associate = (models) => {
        Vaccin.hasMany(models.UbsVaccin, {
            foreignKey: "vaccinId",
            as: "stocks",
            onDelete: "CASCADE"
        })
    }

    Vaccin.findById = async function (id) {
        return await Vaccin.findByPk(id);
    }

    Vaccin.findAllVaccins = async function () {
        return await Vaccin.findAll();
    }

    Vaccin.createVaccin = async function (data) {
        return await this.create(data);
    };

    Vaccin.findVaccinByName = async function (name) {
        return await this.findOne({
           where: where(fn("LOWER", col("name")), fn("LOWER", name))
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