import { treatments } from "../models/entities/treatments.models.js";
import { view_treatments } from "../models/views/treatments.models.js";
import { randomID } from "../utils.js";

function formatTreatment(treatment) {
	return {
		id: treatment.id,
		valid: treatment.valid,
		idPrescription: treatment.id_prescription,
		diagnostic: treatment.name_recipe,
		doctor: {
			id: treatment.id_doctor,
			name: {
				first: treatment.first_name,
				last: treatment.last_name,
			},
			dni: treatment.dni,
			specialty: treatment.specialty,
			email: treatment.email,
			phone: treatment.phone,
			gender: treatment.gender,
			birthdate: treatment.birthdate,
			country: treatment.country,
		},
		patient: {
			id: treatment.id_patient,
			name: {
				first: treatment.patient_first_name,
				last: treatment.patient_last_name,
			},
			dni: treatment.patient_dni,
			specialty: treatment.patient_specialty,
			email: treatment.patient_email,
			phone: treatment.patient_phone,
			gender: treatment.patient_gender,
			birthdate: treatment.patient_birthdate,
		},
		appointment: {
			room: treatment.id_room,
			date: {
				day: treatment.date,
				from: treatment.from_hours,
				to: treatment.to_hours,
			},
		},
	};
}

export async function getTreatments(_, res) {
	try {
		const allTreatments = await view_treatments.findAll();
		const formatAllTreatments = allTreatments.map((treatment) =>
			formatTreatment(treatment),
		);
		res.json(formatAllTreatments);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export async function createTreatment(req, res) {
	try {
		const { body } = req;
		const requiredFields = ["id_appointment", "id_patient", "id_doctor"];
		for (const field of requiredFields) {
			if (!body[field]) {
				return res.status(400).json({ message: `Falto el campo ${field}` });
			}
		}
		body.id_room = randomID();
		const newTreatment = await treatments.create(body);
		res.status(201).json(newTreatment);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export async function updateTreatment(req, res) {
	try {
		const { body } = req;
		const { id } = req.params;
		const requiredFields = [
			"id_appointment",
			"id_patient",
			"id_doctor",
			"id_recipe",
			"is_valid",
		];
		// Verificar si body tiene al menos un campo requerido
		const hasRequiredField = requiredFields.some((field) =>
			Object.keys(body).includes(field),
		);

		if (!hasRequiredField) {
			return res.status(400).json({
				message: `los campos son requeridos: ${requiredFields.join(", ")}`,
			});
		}

		// Verificar si hay campos no permitidos
		const invalidFields = Object.keys(body).filter(
			(field) => !requiredFields.includes(field),
		);
		if (invalidFields.length > 0) {
			return res.status(400).json({
				message: `Los siguientes campos no son válidos: 
				${invalidFields.join(", ")}`,
			});
		}

		await treatments.update(body, { where: { id } });
		res.status(204);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}
