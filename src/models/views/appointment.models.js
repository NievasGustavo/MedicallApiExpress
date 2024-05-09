import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { UUID, TIME, STRING, DATEONLY, BOOLEAN, INTEGER } = DataTypes;

export const viewAppointment = sequelize.define(
	"view_appointment",
	{
		id: {
			type: INTEGER,
			primaryKey: true,
		},
		date: {
			type: DATEONLY,
		},
		from_hours: {
			type: TIME,
		},
		to_hours: {
			type: TIME,
		},
		valid: {
			type: BOOLEAN,
		},
		id_doctor: {
			type: UUID,
		},
		first_name: {
			type: STRING,
		},
		last_name: {
			type: STRING,
		},
		dni: {
			type: STRING,
		},
		birthdate: {
			type: DATEONLY,
		},
		phone: {
			type: STRING,
		},
		gender: {
			type: STRING,
		},
		email: {
			type: STRING,
		},
		specialty: {
			type: STRING,
		},
		country: {
			type: STRING,
		},
	},
	{
		tableName: "view_appointment",
		timestamps: false,
	},
);
