import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import mainRoute from "./routes/mainRoute.js";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.use("/", mainRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
