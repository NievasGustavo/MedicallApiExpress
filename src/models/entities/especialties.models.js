import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

const { INTEGER, STRING } = DataTypes;

export const especialties = sequelize.define("especialties", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	especialty: {
		type: STRING,
		allowNull: false,
	},
},{
	timestamps: false,
}
);
