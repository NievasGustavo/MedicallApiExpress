import { Router } from "express";
import {
	createDoctor,
	getDoctor,
	getDoctors,
    updateDoctor,
} from "../../controllers/accounts/doctors.controllers.js";
const router = Router();

router.get("/doctors/", getDoctors);
router.get("/doctors/:id", getDoctor);
router.post("/doctors/", createDoctor);
router.put("/doctors/:id", updateDoctor);
// router.delete("/doctors/:id", deleteDoctor);

export default router;
