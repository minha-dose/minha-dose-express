const getUbsVaccinModel = (sequelize, { DataTypes }) => {
    const UbsVaccin = sequelize.define("UbsVaccin", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        batch: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { timestamps: true });

    UbsVaccin.associate = (models) => {
        UbsVaccin.belongsTo(models.Vaccin, {
            foreignKey: "vaccinId",
            as: "vaccin",
            onDelete: "CASCADE",
        });

        UbsVaccin.belongsTo(models.Ubs, {
            foreignKey: "ubsId",
            as: "ubs",
            onDelete: "CASCADE",
        });
    };

    UbsVaccin.createUbsVaccin = async function (data){
        const {vaccinId, ubsId, batch, manufacturer, expiration, quantity } = data;
        if(!vaccinId || !ubsId){
            throw new Error("VaccinId e UbsId são obrigatórios.");
        }

        return await this.create({
            vaccinId,
            ubsId,
            batch,
            manufacturer,
            expiration,
            quantity
        });
    }

    UbsVaccin.findVaccinByVaccinId = async function (vaccinId){
        return await this.findAll({
            where: {vaccinId},
            include: [
                {association: this.associations.vaccin},
                {association: this.associations.ubs}
            ]
        })
    }

    UbsVaccin.findVaccinByUbsId = async function(ubsId){
        return await this.findAll({
            where: {ubsId},
            include: [
                {association: this.associations.vaccin},
            ]
        })
    }

    UbsVaccin.decrementQuantity = async function(id){
        const stock = await this.findByPk(id);
        if(!stock) throw new Error("UbsVaccin not found");
        if(stock.quantity <= 0){
            throw new Error("Sem estoque para decrementar.");
        }

        stock.quantity -= 1;
        await stock.save();
        
        return stock;
    }

    return UbsVaccin;
};

export default getUbsVaccinModel;