import { Router } from "express";
import { login } from "../controller/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", login);
