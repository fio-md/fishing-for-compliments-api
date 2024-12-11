import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import gameDataRoute from "./routes/gameDataRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
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
