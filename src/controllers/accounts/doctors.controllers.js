import { viewDocs } from "../../models/views/doctors.models.js";

export const getDoctors = async (req, res) => {
	try {
		const viewAllDocs = await viewDocs.findAll();
		res.json(viewAllDocs);
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

export const createDoctor = async (req, res) => {
	try {
		const { body } = req;
		const {
			first_name,
			last_name,
			email,
			password,
			phone_number,
			birthdate,
			country,
			id_number,
			gender,
			specialty,
		} = body;

		if (
			!first_name ||
			!last_name ||
			!email ||
			!password ||
			!phone_number ||
			!birthdate ||
			!country ||
			!id_number ||
			!gender ||
			!specialty
		) {
			return res.status(400).json({ message: "Invalid request body" });
		}

		const hashedPassword = await bcrypt.hash(body.password, 10);
		body.password = hashedPassword;

		const newDoctor = await doctors.create(body);

		res.status(201).json(newDoctor);
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
