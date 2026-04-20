import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { correo_electronico, user_password } = req.body;
  const db = req.db;

  if (!correo_electronico || !user_password) {
    return res.status(400).json({ message: "Correo y contraseña requeridos" });
  }

  try {
    const user = await db.collection("users").findOne({ correo_electronico });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { userId: user._id, correo_electronico: user.correo_electronico },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login exitoso" });
  } catch (err) {
    res.status(500).json({ message: "Error en login", error: err.message });
  }
};

export const verify = (req, res) => {
  res.json({ message: "Autenticado", user: req.user });
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
  res.json({ message: "Sesión cerrada" });
};