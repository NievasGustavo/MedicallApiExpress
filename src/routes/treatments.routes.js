import { Router } from "express";
import {
	createTreatment,
	getTreatments,
	updateTreatment,
} from "../controllers/treatments.controllers.js";

const router = Router();

router.get("/treatments/", getTreatments);
router.post("/treatments/", createTreatment);
router.patch("/treatment/:id", updateTreatment);

export default router;
