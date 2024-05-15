import { calculateYears, obtenerFechaHoraActual } from "./utils.js";

const gender = "Masculino";
const prefixDoctor = gender === "Masculino" ? "Dr. " : "Dra. ";
const birthdate = "01/01/2000";
const years = calculateYears(birthdate);
const [date, hour] = obtenerFechaHoraActual();
const isColor = true; // recibir por parametros
const color = isColor ? "text-[#104D86]" : "text-black";
export const templateData = {
	classNameColor: `h-full w-full px-10 pb-5 pt-16 ${color}`,
	title: "Receta Médica",
	doctor: {
		name: {
			first: "Gustavo",
			last: "Nievas",
		},
		gender: gender,
		prefix: prefixDoctor,
		university: "Universidad de Oriente",
		direaction:
			"Calle 123, Colonia Centro, C.P. 12345, Ciudad de México, México",
		phone: "123-456-7890",
	},
	patient: {
		name: {
			first: "John",
			last: "Doe",
		},
		gender: "Masculino",
		birthdate: "01/01/2000",
		years: years,
	},
	diagnostic: "Dolor de cabeza",
	order: "987548",
	dateAppointment: {
		date: date,
		time: hour,
	},
	medications: [
		{
			name: "Prendisona",
			dosis: "5mg",
			recomandation: "1/2 tableta cada tercer dia",
			comments: "Tomar a primera hora por la mañana",
		},
		{
			name: "Lisinopril",
			dosis: "20mg",
			recomandation: "1 tableta cada 8 horas",
			comments:
				"Tomar 2 horas despues de ingerir alimentos. Tratar siempre de mantener el mismo horario de toma",
		},
		{
			name: "Metformina",
			dosis: "500mg",
			recomandation: "1 tableta cada 8 horas",
			comments:
				"Tomar 2 horas despues de ingerir alimentos. Tratar siempre de mantener el mismo horario de toma",
		},
	],
};
