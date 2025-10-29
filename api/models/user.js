const getUserModel = (sequelize, { DataTypes }) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    User.associate = (models) => {
        User.hasOne(models.Address, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            as: 'address',
        });

        User.hasOne(models.Contact, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            as: 'contact',
        });

        User.hasOne(models.VaccinCard, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            as: 'vaccinCard',
        });

        User.hasMany(models.Appointment, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            as: 'appointments',
        });
    };

    User.findUserByCpf = async function (cpf) {
        console.log("Método findUserByCpf chamado com:", cpf);
        return await this.findOne({
            where: { cpf },
            attributes: { exclude: ['password'] },
            attributes: ["id", "email"],
        });
    };

    User.findById = async function (id) {
        return await this.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: ['contact', 'address'],
        });
    };

    User.findAllUsers = async function () {
        return await this.findAll({
            attributes: { exclude: ['password'] },
            include: ['contact', 'address'],
        });
    };

    User.findUserByEmail = async function (email) {
        return await this.findOne({
            where: { email },
            attributes: { exclude: ['password'] },
            attributes: ["id", "email"],
        });
    };

    User.createUser = async function (data, models) {
        return await this.create(data, {
            include: ['address', 'contact'],
        });
    };

    User.updateUser = async function (id, data, models) {
        const user = await this.findByPk(id, {
            include: ['address', 'contact'],
        });

        if (!user) return null;

        await user.update(data);

        if (data.address) {
            if (user.address) {
                await models.Address.update(data.address, { where: { userId: id } });
            } else {
                await models.Address.create({ ...data.address, userId: id });
            }
        }

        if (data.contact) {
            if (user.contact) {
                await models.Contact.update(data.contact, { where: { userId: id } });
            } else {
                await models.Contact.create({ ...data.contact, userId: id });
            }
        }

        return await this.findByPk(id, {
            include: ['contact', 'address'],
            attributes: { exclude: ['password'] },
        });
    };

    User.deleteById = async function (id) {
        const user = await this.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    };

    return User;
};

export default getUserModel;