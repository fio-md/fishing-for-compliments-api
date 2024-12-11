import express from "express";
const router = express.Router();
import * as gameController from "../controllers/gameController.js";

router.route("/ranking").get(gameController.getRanking);
router.route("/fish").get(gameController.getRandomFish);

export default router;
