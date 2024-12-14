import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController";

router.get("/inventory", userController.getUserData);
router.post("/inventory", userController.addToInventory);
router.get("/inventory/:id", userController.getFishInfo);
router.delete("/inventory/:id", userController.deleteFish);

export default router;
