import { Router } from "express";
import {
	createAppointment,
	createAppointmentsDay,
	deleteAppointment,
	getAppointments,
} from "../controllers/appointment.controllers.js";

const router = Router();

router.get("/appointments/", getAppointments);
router.post("/appointments/", createAppointment);
router.post("/appointmentsday/", createAppointmentsDay);
router.delete("/appointments/:id", deleteAppointment);

export default router;
