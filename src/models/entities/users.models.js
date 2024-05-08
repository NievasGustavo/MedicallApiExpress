import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { UUID, STRING, DATEONLY, INTEGER } = DataTypes;

export const Users = sequelize.define("Users", {
	ID: {
		type: UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	first_name: {
		type: STRING,
		allowNull: false,
	},
	last_name: {
		type: STRING,
		allowNull: false,
	},
	dni: {
		type: STRING(20),
		allowNull: false,
	},
	birthdate: {
		type: DATEONLY,
	},
	country_id: {
		type: INTEGER,
		allowNull: false,
	},
	phone: {
		type: STRING(20),
	},
	gender: {
		type: STRING(10),
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
	rol_id: {
		type: INTEGER,
		allowNull: false,
	},
});
