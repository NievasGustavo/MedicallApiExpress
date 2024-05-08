import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { INTEGER, STRING } = DataTypes;

export const Roles = sequelize.define("Roles", {
	ID: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	rol: {
		type: STRING,
		allowNull: false,
	},
});
