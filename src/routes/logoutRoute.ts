import express from "express";
const router = express.Router();
import * as logoutController from "../controllers/logoutController";

router.put("/", logoutController.logoutUser);

export default router;
