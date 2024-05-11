import { recipe } from "../models/entities/recipe.models.js";

export async function getRecipe(_, res) {
	try {
		const allRecipe = await recipe.findAll();
		res.json(allRecipe);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export async function createRecipe(req, res) {
	try {
		const { body } = req;
		const requiredFields = ["name", "id_prescription"];
		for (const field of requiredFields) {
			if (!body[field]) {
				return res.status(400).json({ message: `Falto el campo ${field}` });
			}
		}
		body.name = body.name.toLowerCase();
		const newRecipe = await recipe.create(body);
		res.status(201).json(newRecipe);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}
