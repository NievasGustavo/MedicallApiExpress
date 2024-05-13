import { Router } from "express";
import { getRecipe } from "../controllers/pdf/pdf-recipe.controllers.js";


const router = Router();

router.get("/", getRecipe)

export default router;
