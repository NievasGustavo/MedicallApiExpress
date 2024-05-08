import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { UUID, INTEGER } = DataTypes;

export const Doctors = sequelize.define("Doctors", {
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
});
