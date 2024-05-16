import { Router } from "express";
import { validQR } from "../controllers/pdf/qr.controllers.js";

const router = Router();

router.post("/qrScan", validQR);

export default router;
