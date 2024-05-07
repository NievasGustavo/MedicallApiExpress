import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Medicall API Express",
			version: "1.0.0",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["src/routes/**/*.routes.js", "./database/database.js"],
};

// Docs en JSON

const docsJson = swaggerJsdoc(options);

export const swaggerDocs = (app, port) => {
	app.use(
		"/api/docs",
		swaggerUi.serve,
		swaggerUi.setup(docsJson, { explorer: true }),
	);
	app.get("/api/docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(docsJson);
	});

	console.log(
		`📄 Version 1 Docs available at http://localhost:${port}/api/docs`,
	);
};
