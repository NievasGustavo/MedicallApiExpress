import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { UUID, INTEGER } = DataTypes;

export const doctors = sequelize.define(
	"doctors",
	{
		ID_USER: {
			type: UUID,
			primaryKey: true,
		},
		Rol: {
			type: INTEGER,
			defaultValue: 2,
		},
		specialty_id: {
			type: INTEGER,
		},
	},
	{
		timestamps: false,
	},
);
