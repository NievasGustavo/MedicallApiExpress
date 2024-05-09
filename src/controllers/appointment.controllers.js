import { appointments } from "../models/entities/appointments.models.js";
import { viewAppointment } from "../models/views/appointment.models.js";
import { isDateFormatValid, isTimeFormatValid } from "../utils.js";

function formatAppointment(appointment) {
	return {
		id: appointment.id,
		data: {
			date: appointment.date,
			from_hours: appointment.from_hours,
			to_hours: appointment.to_hours,
		},
		doctor: {
			id: appointment.id_doctor,
			name: {
				first: appointment.first_name,
				last: appointment.last_name,
			},
			dni: appointment.dni,
			birthdate: appointment.birthdate,
			phone: appointment.phone,
			gender: appointment.gender,
			email: appointment.email,
			specialty: appointment.specialty,
			country: appointment.country,
		},
		valid: appointment.valid,
	};
}

function calculateCyclesBetweenHours(startTime, endTime, interval = 30) {
	const start = new Date(`2000-01-01T${startTime}`);
	const end = new Date(`2000-01-01T${endTime}`);

	const intervalMin = interval * 60 * 1000;

	const difference = end - start;
	const cycles = Math.floor(difference / intervalMin);

	return cycles;
}

export async function getAppointments(_, res) {
	try {
		const allAppointments = await viewAppointment.findAll();
		if (!allAppointments) {
			return res.status(200).json({ message: "No existen citas medicas" });
		}
		const formatedAppointment = allAppointments.map((appointment) =>
			formatAppointment(appointment),
		);
		res.json(formatedAppointment);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

function validationsCreateAppointment(body) {
	const excludedFields = ["id", "valid"];
	const requiredFields = Object.keys(appointments.rawAttributes).filter(
		(attribute) => !excludedFields.includes(attribute),
	);
	const isValidTimeFrom = isTimeFormatValid(body.from_hours);
	const isValidTimeTo = isTimeFormatValid(body.to_hours);
	const isValidDate = isDateFormatValid(body.date);

	for (const field of requiredFields) {
		if (!body[field]) {
			return [400, `Falto el campo ${field}`];
		}
	}

	if (!isValidTimeFrom || !isValidTimeTo) {
		return [400, "Formato de hora invalido (HH:MM)"];
	}

	if (!isValidDate) {
		return [400, "Formato de fecha invalido (YYYY-MM-DD)"];
	}

	return [null, null];
}

export async function createAppointment(req, res) {
	try {
		const { body } = req;

		const [status, message] = validationsCreateAppointment(body);
		if (status != null) {
			return res.status(status).json({ message: message });
		}

		const newAppointment = await appointments.create(body);
		res.status(201).json(newAppointment);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

function addTimeInterval(time, interval) {
	// Parsea la hora
	const [hours, minutes] = time.split(":").map(Number);

	// Calcula la hora resultante
	const totalMinutes = hours * 60 + minutes + interval;
	const newHours = Math.floor(totalMinutes / 60);
	const newMinutes = totalMinutes % 60;

	// Formatea la hora resultante
	const formattedHours = String(newHours).padStart(2, "0");
	const formattedMinutes = String(newMinutes).padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}`;
}

export async function createAppointmentsDay(req, res) {
	try {
		const { body } = req;
		const [status, message] = validationsCreateAppointment(body);
		if (status != null) {
			return res.status(status).json({ message: message });
		}

		const interval = 30;
		const cycles = calculateCyclesBetweenHours(body.from_hours, body.to_hours);
		console.log(body);
		console.log(cycles);
		for (let i = 0; i < cycles; i++) {
			await appointments.create({
				date: body.date,
				id_doctor: body.id_doctor,
				from_hours: addTimeInterval(body.from_hours, interval * i),
				to_hours: addTimeInterval(body.from_hours, interval * (i + 1)),
			});
		}
		res.status(201).json({ message: "Citas creadas" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export async function deleteAppointment(req, res) {
	try {
		const { id } = req.params;
		await appointments.destroy({ where: { id } });
		res.status(200).json({ message: "Cita medica eliminada" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}
