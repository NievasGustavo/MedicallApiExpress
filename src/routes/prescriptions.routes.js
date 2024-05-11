import { Router } from "express";
import {
	createPrescriptions,
	getPrenscriptions,
} from "../controllers/prenscriptions.controller.js";

const router = Router();

router.get("/prescriptions/", getPrenscriptions);
router.post("/prescriptions/", createPrescriptions);

export default router;
