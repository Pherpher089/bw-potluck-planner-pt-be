const express = require("express");
const cors = require("cors");
const helm = require("helmet");
const morgan = require("morgan");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("./routes/users-router.js");
const potlucksRouter = require("./routes/potlucks-router.js");
const foodRouter = require("./routes/food-router.js");

const server = express();
var corsOptions = {
  origin: "https://optimistic-chandrasekhar-e286d4.netlify.app/",
};
server.use(cors(corsOptions));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/potlucks", potlucksRouter);
server.use("/api/food", foodRouter);

server.get("/", async (req, res) => {
  res.send("😋");
});

module.exports = server;
