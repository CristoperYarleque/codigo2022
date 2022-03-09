import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { categoriaRouter } from "./routes/categoria.routes.js";
import { productoRouter } from "./routes/producto.routes.js";
import { categoriaProductoRouter } from "./routes/categoria_producto.routes.js";
import { usuarioRouter } from "./routes/usuario.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { archivoRouter } from "./routes/archivos.routes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

const listaBlanca = ["http://localhost:3000"];

app.use(json());
app.use(cors({ origin: listaBlanca }));

app.use(productoRouter);
app.use(categoriaRouter);
app.use(categoriaProductoRouter);
app.use(usuarioRouter);
app.use(authRouter);
app.use(archivoRouter);

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
