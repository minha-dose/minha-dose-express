import { Op } from "sequelize";

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
            get() {
                const rawValue = this.getDataValue("date");
                return rawValue ? new Date(rawValue).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : null;
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "scheduled",
        }
    });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.User, { foreignKey: "userId" });
        Appointment.belongsTo(models.Ubs, { foreignKey: "ubsId" });
        Appointment.belongsTo(models.Vaccin, { foreignKey: "vaccinId" });
    };

    const validateAppointmentDate = (date) => {
        const appointmentDate = new Date(date);
        const dayOfWeek = appointmentDate.getDay();
        const hour = appointmentDate.getHours();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error("Agendamentos de vacinação não podem ser feitos aos domingos e sábados.")
        }

        if (hour < 9 || hour > 16) {
            throw new Error("Agendamentos de vacinação são feitos apenas das 9h às 16h.")
        }
    };

    Appointment.getAvailableTimes = async function (date, ubsId) {
        const selectedDate = new Date(`${date}T00:00:00.000Z`);
        if (isNaN(selectedDate.getTime())) {
            throw new Error("Data fornecida inválida");
        }

        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        // Gera horários de 20 em 20 minutos, das 09:00 até 16:00
        const times = [];
        for (let hour = 9; hour <= 16; hour++) {
            for (let minute = 0; minute < 60; minute += 20) {
                const hStr = hour.toString().padStart(2, "0");
                const mStr = minute.toString().padStart(2, "0");
                times.push(`${hStr}:${mStr}`);
            }
        }

        // Busca os agendamentos do dia
        const appointments = await this.findAll({
            where: {
                ubsId,
                date: {
                    [Op.between]: [startOfDay, endOfDay],
                },
            },
            raw: true,
        });

        // Extrai as horas bloqueadas considerando o fuso de São Paulo
        const blocked = appointments.map(a => {
            const localTime = new Date(a.date).toLocaleTimeString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            return localTime; // formato "09:00", "09:20", etc.
        });

        // Filtra horários disponíveis
        const free = times.filter(t => !blocked.includes(t));

        return free;
    };

    Appointment.createAppointment = async function (data) {
        validateAppointmentDate(data.date);
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

    Appointment.deleteById = async function (id) {
        const appointment = await this.findByPk(id);
        if (!appointment) return null;
        await appointment.destroy();
        return appointment;
    };

    return Appointment;
};

export default getAppointmentModel;