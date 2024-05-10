import { decodeToken, verifyToken } from "../../controllers/auth/libs/jwt.js";

export const authMiddleware = async (req, res, next) => {
	try {
		const tokenCookie = req.cookies;
		if (!tokenCookie.token) {
			return res.status(401).json({ message: "Missing token" });
		}

		const checkToken = await decodeToken(tokenCookie);

		if (!checkToken) {
			return res.status(401).json({ message: "Invalid token" });
		}

		const decodedToken = await verifyToken(tokenCookie);

		if (!decodedToken.id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		next();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
