import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController";

router.post("/login", authController.loginUser);

export default router;
