import bcrypt from "bcrypt";
import { roles } from "../../constantes.js";
import { patients } from "../../models/entities/patients.models.js";
import { users } from "../../models/entities/users.models.js";

export const getPatients = async (_, res) => {
	try {
		const allpatients = await users.findAll({
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
		const patient = await users.findOne({
			where: { id, rol_id: roles.Paciente },
			attributes: { exclude: ["password"] },
		});
		if (!patient) {
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
		const excludedFields = ["id", "rol_id"];
		const requiredFields = Object.keys(users.rawAttributes).filter(
			(attribute) => !excludedFields.includes(attribute),
		);
		for (const field of requiredFields) {
			if (!body[field]) {
				return res.status(400).json({ message: `Falto el campo ${field}` });
			}
		}
		const hashedPassword = await bcrypt.hash(body.password, 10);
		body.password = hashedPassword;
		body.rol_id = roles.Paciente;
		const newUser = await users.create(body);
		const objetPatient = {
			id_user: newUser.dataValues.id,
			rol: roles.Paciente,
		};
		console.log(objetPatient);
		const newPatient = await patients.create(objetPatient);

		res.status(201).json(newPatient);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updatePatient = async (req, res) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const excludedFields = ["id", "rol_id"];
		const requiredFields = Object.keys(users.rawAttributes).filter(
			(attribute) => !excludedFields.includes(attribute),
		);

		Object.keys(body).forEach((key) => {
			if (!requiredFields.includes(key)) {
				return res.status(400).json({ message: `La columna no existe ${key}` });
			}
		});

		const patient = await users.findOne({
			where: { id, rol_id: roles.Paciente },
		});
		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		await users.update(body, { where: { id } });
		res.json({ message: "El paciente fue actualizado exitosamente", id });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deletePatient = async (req, res) => {
	try {
		const { id } = req.params;
		const patient = await users.findOne({
			where: { id, rol_id: roles.Paciente },
		});
		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		await patient.destroy();
		res.status(200).json({ message: "Patient deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
