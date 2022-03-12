import { Router } from "express";
import { crearComprobante, obtenerComprobante } from "../controller/facturacion.controller.js";

export const facturacionRouter = Router();

facturacionRouter.post("/crear-comprobante", crearComprobante);

facturacionRouter.get("/obtener-comprobante/:id", obtenerComprobante);
