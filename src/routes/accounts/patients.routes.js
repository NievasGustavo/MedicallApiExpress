import { Router } from "express";
import * as controller from "../../controllers/accounts/patients.controllers.js";
const router = Router();

router.get("/patients/", controller.getPatients);
router.get("/patient/:id", controller.getPatient);
router.post("/patients/", controller.createPatient);
router.patch("/patients/:id", controller.updatePatient);
router.delete("/patients/:id", controller.deletePatient);

export default router;
