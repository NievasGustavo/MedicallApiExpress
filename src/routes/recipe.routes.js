import { Router } from "express";
import { createRecipe, getRecipe } from "../controllers/recipe.controllers.js";

const router = Router();

router.get("/recipe/", getRecipe);
router.post("/recipe/", createRecipe);

export default router;
