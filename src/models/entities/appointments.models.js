import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { INTEGER, DATEONLY, TIME, BOOLEAN } = DataTypes;

export const appointments = sequelize.define(
	"appointments",
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		date: {
			type: DATEONLY,
		},
		to_hours: {
			type: TIME,
		},
		from_hours: {
			type: TIME,
		},
		id_doctor: {
			type: DataTypes.UUID,
		},
		valid: {
			type: BOOLEAN,
		},
	},
	{
		timestamps: false,
	},
);
