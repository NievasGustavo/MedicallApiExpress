import { Router } from "express";
import { generatePDF, getAllPDF } from "../controllers/pdf/pdf.controllers.js";

const router = Router();

router.get("/pdf", generatePDF);
router.get("/getallpdf", getAllPDF);
export default router;
