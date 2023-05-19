import express from "express";
import router from "./controllers/home.js";

const host = 'http://192.168.100.122:'
// const localhost = 'http://localhost:'

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`${host}${PORT}`);
});
