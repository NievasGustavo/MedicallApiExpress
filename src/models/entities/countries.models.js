import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { INTEGER, STRING } = DataTypes;

export const countrys = sequelize.define(
	"countrys",
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		country: {
			type: STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	},
);
