import express from "express";
const router = express.Router();
import * as refreshTokenController from "../controllers/refreshTokenController";

router.get("/", refreshTokenController.refreshToken);

export default router;
