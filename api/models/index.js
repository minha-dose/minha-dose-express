import { Sequelize, DataTypes } from "sequelize";
 
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
    User: getUserModel(sequelize, { DataTypes }),
    Ubs: getUbsModel(sequelize, { DataTypes }),
    Address: getAddressModel(sequelize, { DataTypes }),
    Contact: getContactModel(sequelize, { DataTypes }),
    Vaccin: getVaccinModel(sequelize, { DataTypes }),
    VaccinCard: getVaccinCardModel(sequelize, { DataTypes }),
    UbsVaccin: getUbsVaccinModel(sequelize, { DataTypes }),
    CardVaccin: getCardVaccinModel(sequelize, { DataTypes }),
    Appointment: getAppointmentModel(sequelize, { DataTypes }),
    PasswordReset: getPasswordResetModel(sequelize, { DataTypes }),
}
 
Object.keys(models).forEach((key) => {
    if("associate" in models[key]) {
        models[key].associate(models);
    }
});
 
export { sequelize };
export default models;