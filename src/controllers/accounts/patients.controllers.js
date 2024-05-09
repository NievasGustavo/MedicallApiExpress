import bcrypt from "bcrypt";
import { roles } from "../../constantes.js";
import { users } from "../../models/entities/users.models.js";

export const getPatients = async (_, res) => {
	try {
		const allpatients = await Users.findAll({
			attributes: { exclude: ["password"] },
			where: { rol_id: roles.Paciente },
		});

		const formattedDocs = allpatients.map((patient) => ({
			id: patient.id,
			name: {
				first: patient.first_name,
				last: patient.last_name,
			},
			dni: patient.dni,
			birthdate: patient.birthdate,
			phone: patient.phone,
			gender: patient.gender,
			email: patient.email,
			rol: patient.rol_id,
			country: patient.country_name,
		}));
		res.json(formattedDocs);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getPatient = async (req, res) => {
	try {
		const { id } = req.params;
		const patient = await patients.findOne({
			where: { id },
			attributes: { exclude: ["password"] },
		});
		if (!patient) {
			// nunca entra se va directamente al catch
			return res.status(404).json({ message: "Patient not found" });
		}

		res.json(patient);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createPatient = async (req, res) => {
	try {
		const { body } = req;
		const excludedFields = ["id", "createdAt", "updatedAt", "role"];
		const requiredFields = Object.keys(patients.rawAttributes).filter(
			(attribute) => !excludedFields.includes(attribute),
		);
		console.log(requiredFields);
		for (const field of requiredFields) {
			if (!body[field]) {
				return res.status(400).json({ message: `Falto el campo ${field}` });
			}
		}

		const hashedPassword = await bcrypt.hash(body.password, 10);
		body.password = hashedPassword;

		const newPatient = await patients.create(body, {
			attributes: { exclude: ["password"] },
		});

		res.status(201).json(newPatient);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updatePatient = async (req, res) => {
	try {
		const { id } = req.params;
		const patient = await patients.findOne({ where: { id } });
		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		const updatedPatient = await patient.update(req.body);
		res.json(updatedPatient);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deletePatient = async (req, res) => {
	try {
		const { id } = req.params;
		const patient = await patients.findOne({ where: { id } });
		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		await patient.destroy();
		res.status(200).json({ message: "Patient deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
