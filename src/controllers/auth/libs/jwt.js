import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../../constantes.js";

export const generateToken = (id) => {
	return jwt.sign({ id }, PRIVATE_KEY, { expiresIn: "12h" });
};

export const verifyToken = (token) => {
	try {
		return res.setCookie(jwt.verify(token, PRIVATE_KEY));
	} catch (error) {
		return null;
	}
};

export const decodeToken = (token) => {
	return jwt.decode(token);
};
