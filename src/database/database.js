import "dotenv/config";
import Sequelize from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL);
