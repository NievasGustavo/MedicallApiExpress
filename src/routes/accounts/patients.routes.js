import { Router } from "express";
import {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
} from "../../controllers/accounts/patients.controllers.js";

const router = Router();

router.get("/api/accounts/patients/", getPatients);
router.get("/api/accounts/patients/:id", getPatient);
router.post("/api/accounts/patients/", createPatient);
router.put("/api/accounts/patients/:id", updatePatient);
router.delete("/api/accounts/patients/:id", deletePatient);

export default router;
