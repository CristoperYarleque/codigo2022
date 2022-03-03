import validator from "validator";

export function categoriaProductoDto({ categoriaId, productoId }) {
  if (validator.isEmpty(categoriaId)) {
    throw Error("la categoriaId no puede estar vacio");
  }
  if (validator.isEmpty(productoId)) {
    throw Error("el productoId no puede estar vacio");
  }
  return { categoriaId, productoId };
}
