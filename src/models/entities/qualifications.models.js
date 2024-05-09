import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { INTEGER, STRING } = DataTypes;

export const Qualifications = sequelize.define(
	"Qualifications",
	{
		ID: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		tipo: {
			type: STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	},
);
