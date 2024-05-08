import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { UUID, INTEGER } = DataTypes;

export const Prescriptions = sequelize.define("Prescriptions", {
	ID: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	ID_Prescription: {
		type: UUID,
		allowNull: false,
		unique: true,
	},
	ID_Patient: {
		type: UUID,
	},
	ID_Doctor: {
		type: UUID,
	},
	ID_Medication: {
		type: INTEGER,
	},
});
