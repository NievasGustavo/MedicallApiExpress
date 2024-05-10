import { Router } from "express";
import { roles } from "../../constantes.js";
import { login, logout } from "../../controllers/auth/auth.controllers.js";
import { checkRoleAuth } from "../../middlewares/auth/roleAuth.middleware.js";
import { authMiddleware } from "../../middlewares/auth/validateToken.middleware.js";

const router = Router();

router.post("/login", login);

router.post("/logout", logout);

router.get(
	"/private",
	authMiddleware,
	checkRoleAuth([roles.Paciente]),
	(req, res) => {
		res.status(200).json({ message: "Private route" });
	},
);

export default router;
