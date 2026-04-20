import express from "express";
import * as usersController from "../controllers/usersController.js";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth (público)
router.post("/login", authController.login);
router.post("/", usersController.createUser); // Registro público

// Rutas privadas
router.get("/", verifyToken, usersController.getUsers);
router.get("/verify", verifyToken, authController.verify);
router.post("/logout", verifyToken, authController.logout);
router.get("/:id", verifyToken, usersController.getUserById);
router.put("/:id", verifyToken, usersController.updateUser);
router.delete("/:id", verifyToken, usersController.deleteUser);

export default router;