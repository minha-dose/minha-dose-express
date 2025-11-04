import { Sequelize } from "sequelize";
 
import getUserModel from "./user";
import getContactModel from "./contact";
import getAddressModel from "./address";
import getVaccinModel from "./vaccin";
import getVaccinCardModel from "./vaccincard";
import getUbsModel from "./ubs";
import getUbsVaccinModel from "./ubsVaccin"
import getCardVaccinModel from "./cardVaccin";
import getAppointmentModel from "./appointment";
import getPasswordResetModel from "./passwordReset";
 
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    dialectModule: require("pg"),
})
 
const models = {
    User: getUserModel(sequelize, Sequelize),
    Ubs: getUbsModel(sequelize, Sequelize),
    Address: getAddressModel(sequelize, Sequelize),
    Contact: getContactModel(sequelize, Sequelize),
    Vaccin: getVaccinModel(sequelize, Sequelize),
    VaccinCard: getVaccinCardModel(sequelize, Sequelize),
    UbsVaccin: getUbsVaccinModel(sequelize, Sequelize),
    CardVaccin: getCardVaccinModel(sequelize, Sequelize),
    Appointment: getAppointmentModel(sequelize, Sequelize),
    PasswordReset: getPasswordResetModel(sequelize, Sequelize),
}
 
Object.keys(models).forEach((key) => {
    if("associate" in models[key]) {
        models[key].associate(models);
    }
});
 
export { sequelize };
export default models;