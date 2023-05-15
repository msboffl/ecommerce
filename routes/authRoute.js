import express from "express";
import {
  createUser,
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateSingleUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/allusers", getAllUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteSingleUser);
router.put("/:id", updateSingleUser);

export default router;
