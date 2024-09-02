import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController.js";

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/validate").get(authController.validateUsername);

export default router;
