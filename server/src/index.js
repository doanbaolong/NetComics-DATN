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

const db = require("./app/models/index");

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

//socket.io
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.CLIENT_URL, //specific origin you want to give access to,
  },
});

let onlineUsers = [];

const addNewUsers = (userId, socketId) => {
  !onlineUsers.find((u) => u.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

let users = [];
io.on("connection", (socket) => {
  console.log(socket.id + " connected.");

  socket.on("newUser", (userId) => {
    addNewUsers(userId, socket.id);
    // console.log(onlineUsers);
  });

  socket.on("joinRoom", (comicId) => {
    const user = { userId: socket.id, room: comicId };

    const check = users.every((user) => user.userId !== socket.id);

    if (check) {
      users.push(user);
      socket.join(user.room);
    } else {
      users.map((user) => {
        if (user.userId === socket.id) {
          if (user.room !== comicId) {
            socket.leave(user.room);
            socket.join(comicId);
            user.room = comicId;
          }
        }
      });
    }
    // console.log(users);
    // console.log(socket.adapter.rooms);
  });

  socket.on("createComment", async (msg) => {
    const { userId, comicId, chapterId, content, commentId, send } = msg;

    if (send === "sendReply") {
      const newComment = await db.Reply.create({
        userId,
        comicId,
        chapterId,
        content,
        commentId,
      });
      const user = await db.User.findOne({
        where: { id: userId },
        attributes: ["fullName", "avatar"],
      });
      io.to(newComment.comicId).emit("sendReplyCommentToClient", {
        ...newComment.dataValues,
        user,
      });
    } else {
      const newComment = await db.Comment.create({
        userId,
        comicId,
        chapterId,
        content,
      });
      const user = await db.User.findOne({
        where: { id: userId },
        attributes: ["fullName", "avatar"],
      });
      io.to(newComment.comicId).emit("sendCommentToClient", {
        ...newComment.dataValues,
        user,
      });
    }
  });

  socket.on("newChapter", async (msg) => {
    const { comicId, chapterId, ...data } = msg;

    const find = await db.Follow.findAll({
      where: { comicId },
      attributes: ["userId"],
    });
    const arr = find.map((item) => item.userId);

    for (let id of arr) {
      const newNotification = await db.Notification.create({
        userId: id,
        chapterId,
        ...data,
      });

      const comic = await db.Comic.findOne({
        where: { id: comicId },
        attributes: ["id", "name", "slug", "image"],
      });

      const chapter = await db.Chapter.findOne({
        where: { id: chapterId },
        attributes: ["id", "chapterNumber"],
      });

      const receiver = getUser(id);
      io.to(receiver?.socketId).emit("getNotification", {
        ...newNotification.dataValues,
        Chapter: { ...chapter.dataValues, Comic: { ...comic.dataValues } },
      });
    }
  });

  socket.on("readNotification", async (msg) => {
    const { userId, id } = msg;

    if (id === -1) {
      await db.Notification.update(
        { read: true },
        {
          where: { userId },
        }
      );
    } else {
      await db.Notification.update(
        { read: true },
        {
          where: { id },
        }
      );
    }

    const receiver = getUser(userId);
    io.to(receiver?.socketId).emit("sendReadNotification", id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected.");
    removeUser(socket.id);
  });
});

// Routes init
route(app);

// Connect DB
connect();

http.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.env.TZ = "Asia/Ho_Chi_Minh";
