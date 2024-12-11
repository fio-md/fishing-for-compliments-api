import express from "express";
const router = express.Router();
import * as usersController from "../controllers/userController.ts";

router.route("/register").post(usersController.registerUser);
router.route("/login").post(usersController.loginUser);
router
  .route("/inventory")
  .get(usersController.authenticateToken, usersController.getUserData)
  .post(usersController.authenticateToken, usersController.addToInventory);
router
  .route("/inventory/:id")
  .get(usersController.authenticateToken, usersController.getFishInfo)
  .delete(usersController.authenticateToken, usersController.deleteFish);

export default router;
