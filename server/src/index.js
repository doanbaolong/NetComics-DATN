const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
let port = process.env.PORT || 3001;

const route = require("./routes");
const connect = require("./app/config/connect");
const methodOverride = require("method-override");

const redisClient = require("./app/config/redis");
const cron = require("node-cron");
const {
  updateViewCountToDatabaseService,
} = require("./services/ChapterServices");

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.CLIENT_URL, //specific origin you want to give access to,
  },
});
const socket = require("./sockets");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

// apply middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(methodOverride("_method"));

// Connect Redis server
(async () => {
  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  await redisClient.connect();
})();
// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources", "views"));

// cron job every 5 minutes
cron.schedule("*/5 * * * *", () => {
  updateViewCountToDatabaseService();
});

//socket.io
socket(io);

// Routes init
route(app);

// Connect DB
connect();

http.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.env.TZ = "Asia/Ho_Chi_Minh";
