import express from "express";
import patientsRoutes from "./routes/accounts/patients.routes.js";
import doctorsRoutes from "./routes/accounts/doctors.routes.js";

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use(patientsRoutes);
app.use(doctorsRoutes);

export default app;
