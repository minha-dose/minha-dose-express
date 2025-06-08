const getAddressModel = (sequelize, { DataTypes }) => {
    const Address = sequelize.define("address", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        district: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        extraInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Address.associate = (models) => {
        Address.belongsTo(models.User);
        Address.belongsTo(models.Ubs);
    };

    Address.findById = async function(id) {
        return await this.findByPk(id);
    };

    Address.findAllAddresses = async function(){
        return await this.findAll();
    }

    Address.findAddressByUserId = async function(userId){
        return await this.findOne({
            where: { userId }
        });
    }

    Address.findAddressByUbsId = async function(ubsId){
        return await this.findOne({
            where: { ubsId }
        });
    }

    return Address;
}

module.exports = getAddressModel;