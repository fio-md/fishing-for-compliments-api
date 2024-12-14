import express from "express";
import "dotenv/config";
import cors from "cors";
import gameDataRoute from "./routes/gameDataRoute.js";
import userRoute from "./routes/userRoute.js";
import { verifyJWT } from "./middleware/verifyJWT.js";

const app = express();

const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.static("public"));

app.use("/game", gameDataRoute);

app.use(verifyJWT);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
