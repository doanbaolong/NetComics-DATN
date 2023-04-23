const crudRouter = require("./crud");
const authRouter = require("./auth");
const insertRouter = require("./insert");
const genreRouter = require("./genre");
const userRouter = require("./user");
const authorRouter = require("./author");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/insert", insertRouter);
  app.use("/api/genre", genreRouter);
  app.use("/api/user", userRouter);
  app.use("/api/author", authorRouter);
  app.use("/crud", crudRouter);
}

module.exports = route;
