import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { UUID, INTEGER } = DataTypes;

export const patients = sequelize.define(
	"patients",
	{
		id_user: {
			type: UUID,
			primaryKey: true,
		},
		rol: {
			type: INTEGER,
			defaultValue: 1,
		},
	},
	{
		timestamps: false,
	},
);
