import express, { json } from "express";
import mongoose from "mongoose";
import { categoriaRouter } from "./routes/categoria.routes.js";
import { productoRouter } from "./routes/producto.routes.js";
import { categoriaProductoRouter } from "./routes/categoria_producto.routes.js";
import { imagenRouter } from "./routes/imagen.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const direccion_proyecto = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(json());

app.use(productoRouter);
app.use(categoriaRouter);
app.use(categoriaProductoRouter);
app.use(imagenRouter);

app.use("/src/media", express.static(direccion_proyecto + "/media"));

app.listen(PORT, async () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
  try {
    await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.DATABASE_URL
        : process.env.DATABASE_URL_DEV
    );
    console.log("Bd sincronizada exitosamente");
  } catch (error) {
    console.log("Error al conectarse con la bd ❌");
  }
});
