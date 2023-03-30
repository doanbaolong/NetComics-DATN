const crudRouter = require("./crud");
const authRouter = require("./auth");
const insertRouter = require("./insert");
const genreRouter = require("./genre");

function route(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/genre", genreRouter);
  app.use("/crud", crudRouter);
}

module.exports = route;
