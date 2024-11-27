import express from "express";
const app = express();
import dotenv from "dotenv";
import router from "./routes/route";

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`);
});
