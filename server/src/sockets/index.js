const joinRoomSocket = require("./join");
const commentSocket = require("./comment");
const notificationSocket = require("./notification");
const ratingSocket = require("./rating");

let users = [];

function socket(io) {
  io.on("connection", (socket) => {
    console.log(socket.id + " connected.");

    joinRoomSocket(socket, users);
    commentSocket(io, socket);
    notificationSocket(io, socket);
    ratingSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(socket.id + " disconnected.");
      users = users.filter((user) => user.userId !== socket.id);
    });
  });
}

module.exports = socket;
