import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { INTEGER, STRING } = DataTypes;

export const Recipe = sequelize.define(
	"Recipe",
	{
		ID: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: STRING,
			allowNull: false,
		},
		ID_Prescription: {
			type: DataTypes.UUID,
		},
	},
	{
		timestamps: false,
	},
);
