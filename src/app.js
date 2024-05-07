import cors from "cors";
import express from "express";
import doctorsRoutes from "./routes/accounts/doctors.routes.js";
import patientsRoutes from "./routes/accounts/patients.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

// Routes
app.use("/api", patientsRoutes);
app.use("/api", doctorsRoutes);

export default app;
