// Validar el formato de la hora (HH:MM)
export function isTimeFormatValid(time) {
	return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

// Validar el formato de la fecha (YYYY-MM-DD)
export function isDateFormatValid(date) {
	return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export function randomID(len) {
	let result = "";
	const chars =
		"12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
	const maxPos = chars.length;
	let i = 0;
	const length = len || 5;
	for (i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * maxPos));
	}

	return result;
}
