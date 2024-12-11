import express from "express";
import "dotenv/config";
import cors from "cors";
import gameDataRoute from "./routes/gameDataRoute.js";
import userRoute from "./routes/userRoute.ts";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.send("Welcome to my API");
});
app.use("/user", userRoute);
app.use("/game", gameDataRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
