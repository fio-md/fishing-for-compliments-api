import express from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
