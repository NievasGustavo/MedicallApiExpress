import PDFDocument from "pdfkit-table";
import QRCode from "qrcode";
import { generateToken } from "../../controllers/libs/jwt.js";

export const getRecipe = async (req, res) => {
	try {
		const options = {
			size: "A4",
			margin: 50,
			bufferPages: true,
			font: "Helvetica",
			utf8: true,
		};
		const doc = new PDFDocument(options);

		const data = {
			idRecipe: "123456",
			patientName: "Regina Leñero Méndez",
			patientAge: 30,
			patientBirthDate: "16/06/1994",
			patientGender: "Hombre",
			patientDni: "12345678",
			patientDiagnosis: "Migraña",
			doctorName: "Smith",
			doctorGender: "Hombre",
			doctorSpecialty: "Pediatria",
			doctorMatricule: "123456",
			prescriptionDate: "16 de junio de 2022",
			observationsGeneral:
				"Cuidar la ingesta de alimentos particularmente no comer proteina en exceso, no alimentos procesados como jamon, salchichas y refrescos. Antes de ir a la playa tomar agua.",
			appoimentDate: "16/06/2022",
			appoimentHour: "10:00",
			medicines: [
				{
					medication: "Aspirina",
					dosage: "500 mg",
					frequency: "1 pastilla al dia",
					duration: "1 semana",
					notes: "Tomar en ayunas y esperar una hora antes de la comida",
				},
				{
					medication: "Paracetamol",
					dosage: "500 mg",
					frequency: "1 pastilla y media al dia",
					duration: "1 mes",
					notes: "Tomar separado de las comidas",
				},
				{
					medication: "Ibuprofeno",
					dosage: "500 mg",
					frequency: "1/2 pastilla al dia",
					duration: "3 dias",
					notes: "Antes de dormir y despues de cenar",
				},
			],
		};

		if (data.doctorGender === "Hombre") {
			doc
				.font("Helvetica-Bold")
				.fontSize(30)
				.text(`Dr. ${data.doctorName}`, 40, 60);
		} else {
			doc.fontSize(15).text(`Dra. ${data.doctorName}`, 40, 60);
		}
		doc
			.font("Helvetica")
			.fontSize(15)
			.text(`Especialidad: ${data.doctorSpecialty}`, 40, 90);
		doc.fontSize(15).text(`M.P: ${data.doctorMatricule}`, 40, 110);

		doc
			.fontSize(15)
			.text("Nro. de Orden:", 390, 70)
			.font("Helvetica-Bold")
			.fontSize(15)
			.text(`${data.idRecipe}`, 490, 70);
		doc
			.font("Helvetica")
			.fontSize(15)
			.text(`Consulta: ${data.appoimentDate}`, 390, 90);
		doc.fill().fontSize(15).text(`Hora: ${data.appoimentHour}`, 390, 110);

		doc
			.moveTo(40, 140)
			.strokeColor("#000")
			.lineWidth(1)
			.moveTo(40, 140)
			.lineTo(550, 140)
			.stroke()
			.moveDown(1);

		doc
			.font("Helvetica-Bold")
			.fontSize(15)
			.text("Paciente", 250, 160, { underline: true });
		doc.fontSize(15).text(`${data.patientName}`, 40, 180);
		doc
			.font("Helvetica")
			.fontSize(15)
			.text("Edad:", 40, 200)
			.font("Helvetica-Bold")
			.fontSize(15)
			.text(`${data.patientAge} (${data.patientBirthDate})`, 80, 200);
		doc
			.font("Helvetica")
			.fontSize(15)
			.text("Diagnóstico: ", 40, 220)
			.font("Helvetica-Bold")
			.fontSize(15)
			.text(`${data.patientDiagnosis}`, 125, 220);

		doc
			.font("Helvetica-Bold")
			.fontSize(15)
			.text("Medicamentos e Indicaciones", 180, 260, { underline: true });

		for (let i = 0; i < data.medicines.length; i++) {
			doc
				.font("Helvetica-Bold")
				.fontSize(15)
				.text(
					`${i + 1}) ${data.medicines[i].medication} ${
						data.medicines[i].dosage
					} -`,
					40,
					300 + i * 100,
				)
				.font("Helvetica")
				.fontSize(15)
				.text(
					`${data.medicines[i].frequency} durante ${data.medicines[i].duration}`,
					215,
					300 + i * 100,
				);
			doc.fontSize(15).text("Observaciones:", 60, 320 + i * 110);
			doc.fontSize(15).text(`${data.medicines[i].notes}`, 60, 340 + i * 110);
		}

		doc
			.font("Helvetica-Bold")
			.fontSize(15)
			.text("Recomendaciones Generales:", 180, 600, { underline: true });
		doc
			.font("Helvetica")
			.fontSize(15)
			.text(`${data.observationsGeneral}`, 40, 625);

		doc
			.moveTo(40, 680)
			.strokeColor("#000")
			.lineWidth(1)
			.moveTo(40, 680)
			.lineTo(550, 680)
			.stroke()
			.moveDown(1);

		if (data.idRecipe !== undefined) {
			const tokenRecipe = generateToken(data.idRecipe);
			const url = `http://localhost:3000/api/verify-recipe/${tokenRecipe}`;
			const qr = await QRCode.toDataURL(url);
			doc.image(qr, 40, 700, { width: 100 });
			console.log(url);
		}

		doc.pipe(res);
		doc.end();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const verifyRecipe = async (req, res) => {
	try {
		const { id } = req.params;
		const recipe = await recipes.findOne({ where: { id } });
		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}
		res.status(200).json({ recipe });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
