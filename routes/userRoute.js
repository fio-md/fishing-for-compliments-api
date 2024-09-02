import express from "express";
const router = express.Router();
import * as usersController from "../controllers/userController.js";

router.route("/:id").get(usersController.getUserData).post(usersController.addFish).delete(usersController.deleteFish);

export default router;
