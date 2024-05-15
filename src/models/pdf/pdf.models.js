import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const PDF = sequelize.define(
	"pdftest",
	{
		filename: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.BLOB("long"),
			allowNull: false,
		},
	},
	{
		tableName: "pdftest",
		timestamps: false,
	},
);
