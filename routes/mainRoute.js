import express from "express";
const router = express.Router();
import * as mainController from "../controllers/mainController.js";

router.route("/leaderboard").get(mainController.getLeaderboard);

export default router;
