import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import doctorsRoutes from "./routes/accounts/doctors.routes.js";
import patientsRoutes from "./routes/accounts/patients.routes.js";
import appointment from "./routes/appointment.routes.js";
import authRoutes from "./routes/auth/auth.routes.js";
import pdf from "./routes/pdf.routes.js";
import prescription from "./routes/prescriptions.routes.js";
import qr from "./routes/qr.routes.js";
import recipe from "./routes/recipe.routes.js";
import treatments from "./routes/treatments.routes.js";
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");
app.use(cookieParser());

// Routes
app.use("/api", qr);
app.use("/api", pdf);
app.use("/api", treatments);
app.use("/api", patientsRoutes);
app.use("/api", prescription);
app.use("/api", appointment);
app.use("/api", doctorsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", recipe);

export default app;
