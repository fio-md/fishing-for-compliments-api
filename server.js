import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import gameDataRoute from "./routes/gameDataRoute.js";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

function getToken(req) {
  if (!req.headers.authToken) {
    return;
  } else {
    return req.headers.authToken.split(" ")[1];
  }
}

app.get("/", (req, res) => {
  res.send("Connected to Fishing for Compliments API");
});
app.use("/auth", authRoute);
app.use("/gamedata", gameDataRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
