const crudRouter = require("./crud");
const authRouter = require("./auth");

function route(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/crud", crudRouter);
}

module.exports = route;
