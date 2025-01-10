import express from "express";
const router = express.Router();
import * as registerController from "../controllers/registerController";

router.post("/", registerController.registerUser);
router.get("/validate", registerController.validateUsername);

export default router;
