import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { UUID, STRING, DATEONLY, INTEGER } = DataTypes;

export const doctors = sequelize.define(
	"doctors",
	{
		id: {
			type: UUID,
			primaryKey: true,
			defaultValue: UUID,
		},
		first_name: {
			type: STRING,
			allowNull: false,
		},
		last_name: {
			type: STRING,
			allowNull: false,
		},
		id_number: {
			type: STRING,
			allowNull: false,
			unique: true,
		},
		birthdate: {
			type: DATEONLY,
			allowNull: false,
		},
		country: {
			type: STRING,
			allowNull: false,
		},
		phone_number: {
			type: STRING,
			allowNull: false,
		},
		gender: {
			type: STRING,
			allowNull: false,
		},
		email: {
			type: STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: STRING,
			allowNull: false,
		},
		role: {
			type: INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		specialty: {
			type: STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	},
);
