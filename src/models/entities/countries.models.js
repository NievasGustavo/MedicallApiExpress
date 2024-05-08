import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { INTEGER, STRING } = DataTypes;

export const Countrys = sequelize.define("Countrys", {
	ID: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	country: {
		type: STRING,
		allowNull: false,
	},
});
