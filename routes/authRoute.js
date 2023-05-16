import express from "express";
import {
  createUser,
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateSingleUser,
} from "../controllers/userController.js";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/allusers", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.delete("/:id", deleteSingleUser);
router.put("/:id", updateSingleUser);

export default router;
