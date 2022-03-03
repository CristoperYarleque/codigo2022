import { ImagenService } from "../services/imagen.service.js";

export async function subirImagen(req, res) {
  const { id } = req.params;
  try {
    const respuesta = await ImagenService.subirImagen(id, req.file.path);
    return res.status(200).json(respuesta);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al subir la imagen", content: error.message });
  }
}
