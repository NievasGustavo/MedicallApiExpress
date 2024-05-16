import fs from "fs";
import handlebars from "handlebars";
import path, { dirname } from "path";
import puppeteer from "puppeteer";
import qr from "qrcode";
import { fileURLToPath } from "url";
import { PDF } from "../../models/pdf/pdf.models.js";
import { templateData } from "./helpers/constants.js";

//Actualmente se crea y se lee en el disco (crea un archivo local)
// quitar eso y leer el buffer directamente y guardarlo en bd sin pasar por disco

export async function generatePDF(req, res) {
	try {
		// Create QR
		const code = crypto.randomUUID(); // Genera un UUID único para el código del QR
		const templateQR = `
		El codigo QR es: ${code}.
		Para validar la receta, por favor ingrese al siguiente link.
		https://medicallapiexpress.vercel.app/qr/${code}
		`;
		const qrImage = await qr.toDataURL(templateQR);
		// Guarda el código QR en la base de datos
		//	await QRCode.create({ code });

		// Obtener la ruta del directorio del archivo actual
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = dirname(__filename);
		const nameFile = "output2.pdf";
		// Construir la ruta absoluta de la plantilla
		const templatePath = path.join(__dirname, "plantilla.handlebars");

		// helpers
		let positionCounter = 1;
		handlebars.registerHelper("counter", function () {
			return positionCounter++;
		});

		// Renderizar la plantilla HTML con Handlebars
		const template = handlebars.compile(fs.readFileSync(templatePath, "utf8"));
		const newTamplateQR = {
			...templateData,
			codeQR: qrImage,
		};
		// Datos para renderizar la plantilla (opcional)
		const html = template(newTamplateQR);

		// Lanzar una instancia de Puppeteer
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		// Establecer el contenido HTML de la página
		await page.setContent(html);

		// Generar el PDF
		await page.pdf({ path: nameFile, format: "Letter" });

		// Cerrar el navegador de Puppeteer
		await browser.close();

		// Guardar pdf en base de datos
		await PDF.create({
			filename: nameFile,
			content: fs.readFileSync(nameFile),
		});

		res.send("PDF generado correctamente.");
	} catch (error) {
		console.error("Error al generar el PDF:", error);
		res.status(500).send("Error interno del servidor.");
	}
}

export async function getAllPDF(req, res) {
	try {
		// Obtener todos los registros de la tabla pdftest
		const pdfList = await PDF.findAll();

		// Devolver la lista de objetos PDF
		res.json(pdfList);
	} catch (error) {
		console.error("Error al obtener los PDF de la base de datos:", error);
		res.status(500).send("Error interno del servidor.");
	}
}
