import bcrypt from "bcrypt";
import { roles } from "../../constantes.js";
import { countrys } from "../../models/entities/countries.models.js";
import { doctors } from "../../models/entities/doctors.models.js";
import { especialties } from "../../models/entities/especialties.models.js";
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
			country: countryPascal,
			dni,
			gender,
			specialty,
		} = body;

		for (const key in body) {
			if (!body[key]) {
				return res.status(400).json({ message: "Invalid request body" });
			}
		}

		const especialty = specialty;
		const especialtyId = await especialties.findOne({ where: { especialty } });

		body.specialty = especialtyId.dataValues.id;

		const country = countryPascal.replace(/\w+/g, function (w) {
			return w[0].toUpperCase() + w.slice(1).toLowerCase();
		});

		const countryid = await countrys.findOne({ where: { country } });
		body.country_id = countryid?.dataValues.id;

		const hashedPassword = await bcrypt.hash(body.password, 10);
		body.password = hashedPassword;

		body.rol_id = roles.Doctor;

		const newUser = await users.create(body);

		const newDoctor = await doctors.create({
			ID_USER: newUser.dataValues.id,
			Rol: body.rol_id,
			specialty_id: body.specialty,
		});

		res.status(201).json(newDoctor);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

/*export const getDoctor = async (req, res) => {
	try {
		const { id } = req.params;
		const doctor = await doctors.findOne({ where: { id } });
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}
		res.json(doctor);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updateDoctor = async (req, res) => {
	try {
		const { id } = req.params;
		const doctor = await doctors.findOne({ where: { id } });
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}

		const updatedDoctor = await doctor.update(req.body);
		res.json(updatedDoctor);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

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
