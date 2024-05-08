import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { INTEGER, STRING } = DataTypes;

export const Especialties = sequelize.define("Especialties", {
	ID: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	especialty: {
		type: STRING,
		allowNull: false,
	},
});
