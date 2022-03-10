import { Router } from "express";
import { login, validarCorreo } from "../controller/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/validar-Correo", validarCorreo);
