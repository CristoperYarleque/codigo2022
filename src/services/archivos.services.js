import { s3 } from "../s3.js";
import { Producto } from "../models/producto.model.js";
import { hashSync } from "bcrypt";

export class ArchivosService {
  static async crearArchivo(data) {
    const path = `archivos/productos/${data.productoId}`;

    const Key = `${path}/${hashSync(data.filename, 10)}.${data.ext}`;

    const url = s3.getSignedUrl("putObject", {
      Key,
      ContentType: data.contentType,
      Bucket: process.env.AWS_BUCKET,
      Expires: +process.env.AWS_SIGNED_EXPIRES_IN,
    });

    await Producto.findOneAndUpdate(
      { _id: data.productoId },
      { imagen: Key },
      {
        new: true,
      }
    );

    return url;
  }

  static devolverURL(path) {
    return s3.getSignedUrl("getObject", {
      Key: path,
      Bucket: process.env.AWS_BUCKET,
      Expires: +process.env.AWS_SIGNED_EXPIRES_IN,
    });
  }

  static eliminarArchivo(path) {
    s3.deleteObject(
      { Bucket: process.env.AWS_BUCKET, Key: path },
      (error, data) => {
        if (error) {
          console.log("el error es");
          console.log(error);
        }
        if (data) {
          console.log("la data es");
          console.log(data);
        }
      }
    );
  }
}
