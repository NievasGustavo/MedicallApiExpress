import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const view_treatments = sequelize.define(
	"view_treatments",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		valid: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		id_doctor: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		patient_birthdate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		id_prescription: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		is_valid: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		birthdate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		patient_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		from_hours: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		to_hours: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		specialty: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name_recipe: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		id_room: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		patient_first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		patient_last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		patient_dni: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		patient_phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		patient_gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		patient_email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dni: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	},
);
