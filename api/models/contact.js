const getContactModel = (sequelize, { DataTypes }) => {
    const Contact = sequelize.define("contact", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Contact.associate = (models) => {
        Contact.belongsTo(models.User);
        Contact.belongsTo(models.Ubs);
    };

    Contact.findById = async function (id) {
        return await this.findByPk(id);
    };

    Contact.findAllContacts = async function () {
        return await this.findAll(); // Sem include
    };

    Contact.findContactByUserId = async function(userId){
        return await this.findOne({
            where: { userId }
        });
    }

    Contact.findContactByUbsId = async function(ubsId){
        return await this.findOne({
            where: { ubsId }
        });
    }

    return Contact;
}

module.exports = getContactModel;