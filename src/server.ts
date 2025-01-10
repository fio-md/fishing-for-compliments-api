import express from "express";
import "dotenv/config";
import { credentials } from "./middleware/credentials";
import { corsOptions } from "./config/corsOptions";
import cors from "cors";
import gameDataRoute from "./routes/gameDataRoute";
import authRoute from "./routes/authRoute";
import logoutRoute from "./routes/logoutRoute";
import refreshRoute from "./routes/refreshRoute";
import registerRoute from "./routes/registerRoute";
import userRoute from "./routes/userRoute";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middleware/verifyJWT";

const app = express();

const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));

app.use("/game", gameDataRoute);
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);

app.use(verifyJWT);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
