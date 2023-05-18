const crudRouter = require("./crud");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const insertRouter = require("./insert");
const genreRouter = require("./genre");
const userRouter = require("./user");
const authorRouter = require("./author");
const comicRouter = require("./comic");
const chapterRouter = require("./chapter");
const followRouter = require("./follow");
const historyRouter = require("./history");
const ratingRouter = require("./rating");
const commentRouter = require("./comment");
const notifyRouter = require("./notify");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/insert", insertRouter);
  app.use("/api/genre", genreRouter);
  app.use("/api/user", userRouter);
  app.use("/api/author", authorRouter);
  app.use("/api/comic", comicRouter);
  app.use("/api/chapter", chapterRouter);
  app.use("/api/follow", followRouter);
  app.use("/api/history", historyRouter);
  app.use("/api/rating", ratingRouter);
  app.use("/api/comment", commentRouter);
  app.use("/api/notify", notifyRouter);
  app.use("/crud", crudRouter);
}

module.exports = route;
