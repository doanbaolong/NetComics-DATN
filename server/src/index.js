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

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

// Connect DB
connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
