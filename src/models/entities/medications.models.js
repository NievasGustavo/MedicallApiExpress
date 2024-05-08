import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { INTEGER, STRING } = DataTypes;

export const Medications = sequelize.define("Medications", {
	ID: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: STRING,
		allowNull: false,
	},
	format: {
		type: STRING,
		allowNull: false,
	},
	dosage: {
		type: STRING(100),
	},
});
