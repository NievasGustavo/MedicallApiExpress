import fs from "fs";
import PDFDocument from "pdfkit";

const html = fs.readFileSync(
	"./src/controllers/pdf/templeteRecipe.html",
	"utf8",
);

export const buildPDF = (dataCallback, endCallback) => {
	try {
		const doc = new PDFDocument({ size: "A4" });
		doc.on("data", dataCallback);
		doc.on("end", endCallback);

		doc.text(html, {
			align: "center",
		});
		doc.end();
	} catch (error) {
        console.log(error);
	}
};
