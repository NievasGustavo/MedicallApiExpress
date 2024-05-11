import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { UUID, INTEGER } = DataTypes;

export const prescriptions = sequelize.define(
	"prescriptions",
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_prescription: {
			type: UUID,
			allowNull: false,
		},
		id_patient: {
			type: UUID,
		},
		id_doctor: {
			type: UUID,
		},
		id_medication: {
			type: INTEGER,
		},
	},
	{
		timestamps: false,
	},
);
