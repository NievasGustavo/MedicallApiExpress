import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../../constantes.js";

export const generateToken = (id) => {
	return jwt.sign({ id }, PRIVATE_KEY, { expiresIn: "12h" });
};

export const verifyToken = async (token) => {
	try {
		return jwt.verify(token.token, PRIVATE_KEY);
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const decodeToken = async (token) => {
	try {
		return jwt.decode(token.token);
	} catch (error) {
		console.log(error);
		return null;
	}
};
