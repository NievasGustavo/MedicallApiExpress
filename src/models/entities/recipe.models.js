import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { INTEGER, STRING } = DataTypes;

export const recipe = sequelize.define(
	"recipe",
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: STRING,
			allowNull: false,
		},
		id_prescription: {
			type: DataTypes.UUID,
		},
	},
	{
		tableName: "recipe",
		timestamps: false,
	},
);
