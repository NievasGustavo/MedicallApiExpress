import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database";

const { UUID, STRING, DATEONLY, INTEGER } = DataTypes;

export const viewDocs = sequelize.define(
	"view_docs",
	{
		id: {
			type: UUID,
		},
		first_name: {
			type: STRING,
		},
		last_name: {
			type: STRING,
		},
		dni: {
			type: STRING(20),
		},
		birthdate: {
			type: DATEONLY,
		},
		phone: {
			type: STRING(20),
		},
		gender: {
			type: STRING(10),
		},
		email: {
			type: STRING,
			unique: true,
		},
		rol_id: {
			type: INTEGER,
		},
		specialty_name: {
			type: STRING,
		},
		country_name: {
			type: STRING,
		},
	},
	{
		timestamps: false,
	},
);
