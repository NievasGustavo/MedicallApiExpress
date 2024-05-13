import bcrypt from "bcrypt";
import { roles } from "../../constantes.js";
import { users } from "../../models/entities/users.models.js";
import { viewDocs } from "../../models/views/doctors.models.js";
import { generateToken } from "../../controllers/libs/jwt.js";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Invalid request body" });
		}

		const user = await users.findOne({ where: { email } });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const token = generateToken(user.id);

		if (user.rol_id === roles.Doctor) {
			const doctor = await viewDocs.findOne({ where: { id: user.id } });

			res.cookie("token", token, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
			});
			return res.status(200).json({ user: doctor });
		}
		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const logout = (req, res) => {
	res.cookie("token", "", {
		maxAge: 1,
	});
	return res.status(200).json({ message: "Logout successful" });
};
