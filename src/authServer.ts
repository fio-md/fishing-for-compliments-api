import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as authController from "./controllers/authController";

const app = express();

const PORT = 5050;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());

app.post("/register", authController.registerUser);
app.post("/login", authController.loginUser);
app.get("/refresh", authController.refreshToken);
app.delete("/logout", authController.logoutUser);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
