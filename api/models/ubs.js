const getUbsModel = (sequelize, { DataTypes }) => {
    const Ubs = sequelize.define("ubs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ubsName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
 
    Ubs.associate = (models) => {
        Ubs.hasOne(models.Address, {
            foreignKey: "ubsId",
            onDelete: "CASCADE",
        });
        Ubs.hasOne(models.Contact, {
            foreignKey: "ubsId",
            onDelete: "CASCADE",
        });
        Ubs.belongsToMany(models.Vaccin, {
            through: models.UbsVaccin,
            foreignKey: "ubsId",
            otherKey: "vaccinId",
        });

        Ubs.hasMany(models.Appointment, {
            foreignKey: "ubsId",
            onDelete: "CASCADE"
        })
    };
 
    Ubs.findById = async function (id) {
        return await this.findByPk(id, {
            include: [this.associations.contact, this.associations.address, this.associations.vaccins],
        });
    };
 
    Ubs.findAllUbs = async function () {
        return await this.findAll({
            include: [this.associations.contact, this.associations.address]
        });
    }
 
    Ubs.createUbs = async function (data, models) {
        const { Address, Contact } = models;
 
        return await this.create(data, {
            include: [
                { model: Address },
                { model: Contact },
            ],
        });
    };
 
    Ubs.updateUbs = async function (id, data, models) {
        const ubs = await this.findByPk(id);
        if (!ubs) return null;
 
        await ubs.update(data);
        const { contact, address } = data;
 
        if (contact) {
            const existingContact = await models.Contact.findOne({ where: { ubsId: id } });
            if (existingContact) {
                await existingContact.update(contact);
            } else {
                await models.Contact.create({ ...contact, ubsId: id });
            }
        }
 
        if (address) {
            const existingAddress = await models.Address.findOne({ where: { ubsId: id } });
            if (existingAddress) {
                await existingAddress.update(address);
            } else {
                await models.Address.create({ ...address, ubsId: id });
            }
        }
 
        return await this.findById(id);
    };
 
    Ubs.deleteById = async function (id) {
        const ubs = await this.findByPk(id);
        if (!ubs) return null;
        await ubs.destroy();
        return ubs;
    };
 
    Ubs.findByName = async function (ubsName) {
        const { Op } = sequelize.Sequelize;
        return await this.findAll({
            where: {
                ubsName: {
                    [Op.iLike]: `%${ubsName}%`
                }
            },
            include: [
                { model: models.Address },
                { model: models.Contact }
            ]
        });
    };
 
    Ubs.findVaccinByUbsId = async function(ubsId){
        const ubs = await this.findByPk(ubsId, {
            include: [this.associations.vaccins]
        });
 
        if (!ubs) return null;
        return ubs.vaccins;
    }
 
    return Ubs;
};
 
export default getUbsModel;