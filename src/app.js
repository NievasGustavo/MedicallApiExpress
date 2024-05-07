import express from "express";
import cors from "cors";
import patientsRoutes from "./routes/accounts/patients.routes.js";
import doctorsRoutes from "./routes/accounts/doctors.routes.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

//Routes
app.use(patientsRoutes);
app.use(doctorsRoutes);

export default app;
