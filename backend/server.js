const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

const routes = require("./router/TaskRoute");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoose connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
