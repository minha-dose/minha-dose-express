const getUserModel = (sequelize, { DataTypes }) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        });

        User.hasOne(models.Contact, {
            foreignKey: "userId",
            onDelete: "CASCADE",
        });

        User.hasOne(models.VaccinCard, {
            foreignKey: "userId",
            onDelete: "CASCADE",
        });
    };
    User.findById = async function (id) {
        return await this.findByPk(id);
    };

    User.findAllUsers = async function(){
        return await this.findAll();
    }

    User.findUserByEmail = async function(email){
        return await this.findOne({
            where: { email },
            attributes: ["id","email","password"],
        });
    };

    User.createUser = async function (data) {
        return await this.create(data, {
            include: [models.Address, models.Contact],
        });
    };

    User.updateUser = async function (id, data) {
        const user = await this.findByPk(id);
        if (!user) return null;
        await user.update(data);
        return user;
    };

    User.deleteById = async function (id) {
        const user = await this.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    };

    return User;
};

module.exports = getUserModel;