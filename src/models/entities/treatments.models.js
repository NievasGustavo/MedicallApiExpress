import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { INTEGER, UUID, STRING, BOOLEAN } = DataTypes;

export const treatments = sequelize.define(
	"treatments",
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_appointment: {
			type: INTEGER,
		},
		id_patient: {
			type: UUID,
		},
		id_doctor: {
			type: UUID,
		},
		id_room: {
			type: STRING,
		},
		id_recipe: {
			type: INTEGER,
		},
		is_valid: {
			type: BOOLEAN,
		},
	},
	{ timestamps: false },
);
