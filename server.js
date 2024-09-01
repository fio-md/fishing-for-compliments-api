import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import gameDataRoute from "./routes/gameDataRoute.js";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/gamedata", gameDataRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
