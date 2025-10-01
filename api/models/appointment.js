const getAppointmentModel = (sequelize, { DataTypes }) => {
    const Appointment = sequelize.define("appointment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "scheduled",
        }
    });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.User, { foreignKey: "userId"});
        Appointment.belongsTo(models.Ubs, { foreignKey: "ubsId"});
        Appointment.belongsTo(models.Vaccin, { foreignKey: "vaccinId"});
    };

    Appointment.createAppointment = async function (data) {
        return await this.create(data);
    };

    Appointment.findById = async function (id) {
        return await this.findByPk(id, {
            attributes: [
                "id",
                "userId",
                "ubsId",
                "vaccinId",
                "date",
                "status"
            ]
        });
    };

    Appointment.findAllAppointments = async function () {
        return await this.findAll({
            attributes: [
                "id",
                "userId",
                "ubsId",
                "vaccinId",
                "date",
                "status",
            ]
        });
    };

    Appointment.findByUserId = async function (userId) {
        return await this.findAll({
            where: { userId },
            attributes: [
                "id",
                "userId",
                "ubsId",
                "vaccinId",
                "date",
                "status",
            ]
        });
    };

    Appointment.updateStatus = async function (id, status) {
        const appointment = await this.findByPk(id);
        if (!appointment) return null;
        await appointment.update({ status });
        return appointment;
    };

    Appointment.updateDate = async function (id, newDate) {
        const appointment = await this.findByPk(id);
        if (!appointment) return null;

        await appointment.update({ date: newDate });
        return appointment;
    };

    Appointment.deleteById = async function (id) {
        const appointment = await this.findByPk(id);
        if (!appointment) return null;
        await appointment.destroy();
        return appointment;
    };

    return Appointment;
};

export default getAppointmentModel;