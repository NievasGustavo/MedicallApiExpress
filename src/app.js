import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import doctorsRoutes from "./routes/accounts/doctors.routes.js";
import patientsRoutes from "./routes/accounts/patients.routes.js";
import appointment from "./routes/appointment.routes.js";
import authRoutes from "./routes/auth/auth.routes.js";
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");
app.use(cookieParser());

// Routes
app.use("/api", patientsRoutes);
app.use("/api", appointment);
app.use("/api", doctorsRoutes);
app.use("/api/auth", authRoutes);

export default app;
