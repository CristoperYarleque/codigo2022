import validator from "validator";

export function productoDto({ nombre, precio, descripcion, imagen, cantidad }) {
  if (validator.isEmpty(nombre)) {
    throw Error("el nombre no puede estar vacio");
  }
  if (!validator.isDecimal(precio.toString()) && +precio < 0) {
    throw Error("El precio no puede ser negativo");
  }
  if (validator.isEmpty(descripcion)) {
    throw Error("La descripcion no puede estar vacia");
  }
  if (validator.isEmpty(cantidad)) {
    throw Error("la cantidad no puede estar vacia");
  }
  return { nombre, precio, descripcion, imagen, cantidad };
}
