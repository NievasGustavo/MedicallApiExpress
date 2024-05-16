import { QRCode } from "../../models/pdf/qr.models.js";

export async function validQR(req, res) {
	const { code } = req.body;

	// Verifica si el código existe en la base de datos y no ha sido escaneado
	const qr = await QRCode.findOne({ where: { code, scanned: false } });

	if (qr) {
		// Marca el QR como escaneado
		qr.update({ scanned: true });

		// Envía un mensaje de éxito
		res.send("QR Escaneado");
	} else {
		// Envía un mensaje de error
		res.status(400).send("QR expirado o inválido");
	}
}
