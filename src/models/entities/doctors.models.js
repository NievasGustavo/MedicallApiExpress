import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { UUID, INTEGER } = DataTypes;

export const doctors = sequelize.define(
	"doctors",
	{
		id_user: {
			type: UUID,
			primaryKey: true,
		},
		rol: {
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
