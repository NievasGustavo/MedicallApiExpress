import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { INTEGER, DATE, TIME, BOOLEAN } = DataTypes;

export const Appointments = sequelize.define("Appointments", {
	ID: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	date: {
		type: DATE,
	},
	to_hours: {
		type: TIME,
	},
	from_hours: {
		type: TIME,
	},
	ID_Doctor: {
		type: DataTypes.UUID,
	},
	valid: {
		type: BOOLEAN,
	},
});
