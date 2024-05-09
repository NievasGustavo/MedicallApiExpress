import fs from "fs";
import swaggerUi from "swagger-ui-express";
import yaml from "yaml";

const file = fs.readFileSync("./src/routes/swagger.yaml", "utf8");
const swaggerYaml = yaml.parse(file);

export const swaggerDocs = (app, port) => {
	app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerYaml));
	app.get("/api/docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerYaml);
	});

	console.log(
		`📄 Version 1 Docs available at http://localhost:${port}/api/docs`,
	);
};
