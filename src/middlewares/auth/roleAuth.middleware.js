import { verifyToken } from "../../controllers/libs/jwt.js";
import { users } from "../../models/entities/users.models.js";

export const checkRoleAuth = (roles) => async (req, res, next) => {
	try {
		const token = req.cookies;
		const tokenData = await verifyToken(token);
		const userData = await users.findOne({ where: { id:tokenData.id } });

		if ([].concat(roles).includes(userData.dataValues.rol_id)) {
			next();
		} else {
			return res.status(401).json({ message: "Unauthorized" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
