import { prescriptions } from "../models/entities/prescriptions.models.js";

export async function getPrenscriptions(_, res) {
	try {
		const allPresciptions = await prescriptions.findAll();

		res.json(allPresciptions);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export async function createPrescriptions(req, res) {
	try {
		const { body } = req;

		const prescriptionBody = ["id_patient", "id_doctor", "ids_Medications"];
		for (const field of prescriptionBody) {
			if (!body[field]) {
				return res.status(400).json({ message: `Falto el campo ${field}` });
			}
		}

		const idsMedications = body.ids_Medications ?? [];

		if (!idsMedications.lenght === 0) {
			return res
				.status(400)
				.json({ message: "No se han seleccionado medicamentos" });
		}
		const uuid = crypto.randomUUID();
		idsMedications.map(async (id) => {
			const newPrescription = {
				id_prescription: uuid,
				id_patient: body.id_patient,
				id_medication: id,
				id_doctor: body.id_doctor,
			};
			await prescriptions.create(newPrescription);
		});

		res.status(201).json({ message: "Prescripciones creadas" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}
