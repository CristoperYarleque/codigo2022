import { Usuario } from "../models/usuario.model.js"
import { Producto } from "../models/producto.model.js"
import { Comprobante } from "../models/comprobante.model.js"
import fetch from "node-fetch";

export class FacturacionService {
    static async generarComprobante(data, tipo) {
        try {
            let tipo_de_comprobante;
            const { ref_doc, items, cliente, tipo_documento, numero_documento, direccion } = data;

            let serie;

            switch (tipo) {
                case "FACTURA":
                    tipo_de_comprobante = 1;
                    serie = "FFF1";
                    break;

                case "BOLETA":
                    tipo_de_comprobante = 2;
                    serie = "BBB1";
                    break;

                case "NOTA_CREDITO":
                    tipo_de_comprobante = 3;
                    serie = ref_doc.serie.search("B") != -1 ? "BBB1" : "FFF1";
                    break;

                case "NOTA_DEBITO":
                    tipo_de_comprobante = 4;
                    serie = ref_doc.serie.search("B") != -1 ? "BBB1" : "FFF1";
                    break;
                default:
                    throw Error("Tipo invalido");
            }

            const comprobante = await Comprobante.findOne({ tipo }).sort({
                numero: "desc",
                serie: "desc",
            });

            const numero = comprobante ? comprobante.numero + 1 : 1;

            const clienteEncontrado = await Usuario.findById(cliente);
            let total_gral = 0;

            const productos = await Promise.all(
                items.map(async ({ id, cantidad }) => {
                    const productoEncontrado = await Producto.findById(id);

                    total_gral = total_gral + productoEncontrado.precio * cantidad;
                    const valor_unitario = productoEncontrado.precio / 1.18; // precio sin igv
                    const subtotal = (productoEncontrado.precio / 1.18) * cantidad; // al precio se le quita el igv y se le multiplica por la cantidad
                    const total_prod = productoEncontrado.precio * cantidad; // el precio con IGV
                    const igv = total_prod - subtotal;

                    return {
                        unidad_de_medida: "NIU",
                        codigo: productoEncontrado._id,
                        descripcion: productoEncontrado.nombre,
                        cantidad,
                        valor_unitario,
                        precio_unitario: productoEncontrado.precio,
                        subtotal,
                        tipo_de_igv: 1,
                        total: total_prod,
                        igv,
                        anticipo_regularizacion: false,
                    };
                })
            );
            let cliente_tipo_de_documento;
            switch (tipo_documento) {
                case "DNI":
                    cliente_tipo_de_documento = "1";
                    break;
                case "RUC":
                    cliente_tipo_de_documento = "6";
                    break;
                case "CE":
                    cliente_tipo_de_documento = "4";
                    break;
                case "PASAPORTE":
                    cliente_tipo_de_documento = "7";
                    break;
                default:
                    cliente_tipo_de_documento = "-";
                    break;
            }

            const fecha = new Date();
            const day = fecha.getDate() < 9 ? "0" + fecha.getDate() : fecha.getDate();

            const month =
                fecha.getMonth() + 1 < 9
                    ? "0" + (fecha.getMonth() + 1)
                    : fecha.getMonth() + 1;

            const year = fecha.getFullYear();
            const fecha_de_emision = day + "-" + month + "-" + year;

            console.log(numero);
            const bodyNubefact = {
                operacion: "generar_comprobante",
                tipo_de_comprobante,
                serie,
                numero,
                sunat_transaction: 1,
                moneda: 1,
                cliente_tipo_de_documento,
                cliente_numero_de_documento: numero_documento,
                cliente_denominacion: clienteEncontrado.nombre,
                cliente_direccion: direccion,
                cliente_email: clienteEncontrado.correo,
                fecha_de_emision,
                items: productos,
                enviar_automaticamente_a_la_sunat: true,
                enviar_automaticamente_al_cliente: true,
                formato_de_pdf: "A4",
                porcentaje_de_igv: 18.0,
                // FALTA
                total: total_gral,
                total_gravada: total_gral / 1.18,
                total_igv: total_gral - total_gral / 1.18,
            };
            const resultado = await fetch(process.env.NUBEFACT_URL, {
                method: "POST",
                body: JSON.stringify(bodyNubefact),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.NUBEFACT_TOKEN,
                },
            });
            const dataNubefact = await resultado.json();

            const dataComprobante = await Comprobante.create({
                numero: dataNubefact.numero,
                serie: dataNubefact.serie,
                tipo: tipo,
                pdf: dataNubefact.enlace_del_pdf,
                xml: dataNubefact.enlace_del_xml,
                enlace: dataNubefact.enlace
            })

            return {
                message: "ok",
                data: dataNubefact,
                comprobante: dataComprobante
            };
        } catch (error) {
            console.log(error);
            return {
                message: "false",
                error: error.message
            };
        }
    }

    static async consultarComprobante(id) {
        const productoEncontrado = await Comprobante.findById(id);
        return productoEncontrado
    }
}
