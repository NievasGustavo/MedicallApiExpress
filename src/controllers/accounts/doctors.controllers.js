import bcrypt from "bcrypt";
import { roles } from "../../constantes.js";
import { doctors } from "../../models/entities/doctors.models.js";
import { users } from "../../models/entities/users.models.js";
import { viewDocs } from "../../models/views/doctors.models.js";

export const getDoctors = async (req, res) => {
	try {
		const viewAllDocs = await viewDocs.findAll();

		const formattedDocs = viewAllDocs.map((doctor) => ({
			id: doctor.id,
			name: {
				first: doctor.first_name,
				last: doctor.last_name,
			},
			dni: doctor.dni,
			birthdate: doctor.birthdate,
			phone: doctor.phone,
			gender: doctor.gender,
			email: doctor.email,
			rol: doctor.rol_id,
			specialty: doctor.specialty_name,
			country: doctor.country_name,
		}));

		res.json(formattedDocs);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createDoctor = async (req, res) => {
	try {
		const { body } = req;
		const {
			first_name,
			last_name,
			email,
			password,
			phone,
			birthdate,
			country_id,
			dni,
			gender,
			specialty_id,
		} = body;

		for (const key in body) {
			if (!body[key]) {
				return res.status(400).json({ message: "Invalid request body" });
			}
		}

		const hashedPassword = await bcrypt.hash(body.password, 10);
		body.password = hashedPassword;

		body.rol_id = roles.Doctor;

		const newUser = await users.create(body);

		const newDoctor = await doctors.create({
			id_user: newUser.dataValues.id,
			rol: body.rol_id,
			specialty_id: body.specialty_id,
		});

		res.status(201).json({ newDoctor });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getDoctor = async (req, res) => {
	try {
		const { id } = req.params;
		const doctor = await viewDocs.findOne({
			where: { id },
		});
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}
		res.status(200).json({ doctor });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updateDoctor = async (req, res) => {
	try {
		const { id } = req.params;
		
		const doctor = await doctors.findOne({ where: { id_user: id } });
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}

		req.body.rol_id = roles.Doctor;
		req.body.id = doctor.id_user;
		const updatedDoctor = await users.update(req.body, { where: { id } });
		res.json(doctor);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

/*
export const deleteDoctor = async (req, res) => {
	try {
		const { id } = req.params;
		const doctor = await doctors.findOne({ where: { id } });
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}
		await doctor.destroy();
		res.status(204).json({ message: "Doctor deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};*/
