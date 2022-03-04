import { Router } from "express";
import { crearUsuario } from "../controller/usuario.controller.js";

export const usuarioRouter = Router();

usuarioRouter.post("/registro", crearUsuario);
