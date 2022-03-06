import { ImagenService } from "../services/imagen.service.js";

export async function subirImagen(req, res) {
  const { id } = req.params;
  try {
    const imgUrl = `${process.env.DOMINIO}/${req.file.destination}${req.file.filename}`;
    const respuesta = await ImagenService.subirImagen(id, imgUrl);
    return res.status(200).json(respuesta);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al subir la imagen", content: error.message });
  }
}
