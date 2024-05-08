import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { INTEGER, UUID } = DataTypes;

export const Treatments = sequelize.define("Treatments", {
	ID: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	ID_Appointment: {
		type: INTEGER,
	},
	ID_Patient: {
		type: UUID,
	},
	ID_Doctor: {
		type: UUID,
	},
});
