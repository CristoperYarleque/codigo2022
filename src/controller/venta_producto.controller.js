import { VentaService } from "../services/venta_producto.services.js";

export async function crearVenta(req, res) {
    const resultado = await VentaService.crear(req.body);
    return res.status(resultado.message ? 400 : 201).json(resultado);
}

export async function obtenerVentas(req, res) {
    const resultado = await VentaService.obtenerVentas();
    return res.status(200).json(resultado);
}

export async function obtenerVenta(req, res) {
    const { id } = req.params
    const resultado = await VentaService.obtenerVenta(id);
    return res.status(200).json(resultado);
}

export async function actualizarVenta(req, res) {
    const { id } = req.params;
    const resultado = await VentaService.actualizarVenta(req.body, id);
    return res.status(201).json(resultado);
}