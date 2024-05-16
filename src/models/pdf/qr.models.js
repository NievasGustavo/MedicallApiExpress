import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const QRCode = sequelize.define(
	"qrcode",
	{
		code: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			unique: true,
		},
		scanned: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		tableName: "qrcode",
		timestamps: false,
	},
);
