import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const { UUID, INTEGER } = DataTypes;

export const Patients = sequelize.define("Patients", {
	ID_USER: {
		type: UUID,
		primaryKey: true,
	},
	ROL: {
		type: INTEGER,
		defaultValue: 1,
	},
});
