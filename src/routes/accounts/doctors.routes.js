import { Router } from "express";
import {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../controllers/accounts/doctors.controllers.js";
const router = Router();

router.get("/api/accounts/doctors/", getDoctors);
router.get("/api/accounts/doctors/:id", getDoctor);
router.post("/api/accounts/doctors/", createDoctor);
router.put("/api/accounts/doctors/:id", updateDoctor);
router.delete("/api/accounts/doctors/:id", deleteDoctor);

export default router;
