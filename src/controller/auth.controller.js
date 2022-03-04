import { AuthService } from "../services/auth.service.js";
import { loginDto } from "../dtos/request/login.dto.js";

export async function login(req, res) {
  try {
    const { correo, password } = loginDto(req.body);
    const result = await AuthService.login({ correo, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Datos incorrectos ,Error al hacer el login",
    });
  }
}
