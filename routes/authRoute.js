import express from "express";
const router = express.Router();
import * as usersController from "../controllers/usersController.js";

router.route("/register").post(usersController.registerUser);
router.route("/login").post(usersController.loginUser);
// router.route("/userdata").get(usersController.getUserData);

export default router;
