const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 5000;

const session = require("express-session");
const Memorystore = require("memorystore")(session);

let maxAge = 60 * 1000;
const sessionObj = {
  secret: "myoungin",
  resave: false,
  saveUninitialized: true,
  store: new Memorystore({
    checkPeriod: maxAge,
  }),
  cookie: {
    maxAge: maxAge,
  },
};

app.use(session(sessionObj));

app.use(express.json());
app.use(cors());

const userRouter = require("./router/UserRoute");
const postRouter = require("./router/PostRouter");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoose connected..."))
  .catch((err) => console.log(err));

app.get("/health", (req, res) => {
  console.log(req.session);
  res.send("health check");
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
