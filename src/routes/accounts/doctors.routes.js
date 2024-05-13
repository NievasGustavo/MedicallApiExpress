import { Router } from "express";
import * as controller from "../../controllers/accounts/doctors.controllers.js";

const router = Router();

router.get("/doctors/", controller.getDoctors);
router.get("/doctors/:id", controller.getDoctor);
router.post("/doctors/", controller.createDoctor);
router.put("/doctors/:id", controller.updateDoctor);
router.delete("/doctors/:id", controller.deleteDoctor);

export default router;
