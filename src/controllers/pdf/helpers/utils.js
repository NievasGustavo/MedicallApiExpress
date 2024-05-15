export function calculateYears(birthdate) {
	const fechaNac = new Date(birthdate);
	const fechaActual = new Date();
	let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

	// Comprobar si ya ha pasado su cumpleaños en este año
	const mesActual = fechaActual.getMonth() + 1;
	const diaActual = fechaActual.getDate();
	const mesNac = fechaNac.getMonth() + 1;
	const diaNac = fechaNac.getDate();

	if (mesActual < mesNac || (mesActual === mesNac && diaActual < diaNac)) {
		edad--;
	}

	return edad;
}

export function obtenerFechaHoraActual() {
	// Obtener la fecha actual
	const fecha = new Date();

	// Obtener día, mes y año
	const dia = fecha.getDate();
	const mes = fecha.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
	const año = fecha.getFullYear();

	// Formatear la fecha como "dd/mm/yyyy"
	const fechaFormateada = `${`0${dia}`.slice(-2)}/${`0${mes}`.slice(
		-2,
	)}/${año}`;

	// Obtener la hora actual
	let hora = fecha.getHours();
	const minutos = fecha.getMinutes();

	// Determinar si es AM o PM
	const periodo = hora < 12 ? "AM" : "PM";

	// Convertir la hora al formato de 12 horas
	if (hora > 12) {
		hora -= 12;
	} else if (hora === 0) {
		hora = 12;
	}

	// Formatear la hora como "hh:mm AM/PM"
	const horaFormateada = `${`0${hora}`.slice(-2)}:${`0${minutos}`.slice(
		-2,
	)} ${periodo}`;

	return [fechaFormateada, horaFormateada];
}
