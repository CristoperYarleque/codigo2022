import validator from "validator";

export function categoriaDto({ nombre }) {
  if (validator.isEmpty(nombre)) {
    throw Error("el nombre no puede estar vacio");
  }
  return { nombre };
}
