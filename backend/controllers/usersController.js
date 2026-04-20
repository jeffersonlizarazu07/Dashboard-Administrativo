import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

// GET /users
export const getUsers = async (req, res) => {
  const db = req.db;
  try {
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuarios", error: err.message });
  }
};

// GET /users/:id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const db = req.db;
  try {
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuario", error: err.message });
  }
};

// POST /users
export const createUser = async (req, res) => {
  const { nombre, correo_electronico, user_password } = req.body;
  const db = req.db;
  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const result = await db.collection("users").insertOne({
      nombre,
      correo_electronico,
      user_password: hashedPassword,
    });
    res.status(201).json({ message: "Usuario creado", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Error al crear usuario", error: err.message });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo_electronico, user_password } = req.body;
  const db = req.db;

  if (!nombre || !correo_electronico) {
    return res.status(400).json({ message: "El nombre y email son requeridos" });
  }

  const updateFields = { nombre, correo_electronico };
  if (user_password) {
    updateFields.user_password = await bcrypt.hash(user_password, 10);
  }

  try {
    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    if (!result) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar", error: err.message });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const db = req.db;
  try {
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar", error: err.message });
  }
};