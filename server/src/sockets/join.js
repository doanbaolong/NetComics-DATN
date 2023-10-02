const joinRoomSocket = (socket, users) => {
  socket.on("user:join-app", (userId) => {
    const user = { userId: socket.id, room: `User: ${userId}`, roomType: 0 };
    const check = users.find((u) => u.userId === socket.id && u.roomType === 0);
    if (!check) {
      users.push(user);
      socket.join(user.room);
    }
    // console.log(users);
  });

  socket.on("comic:join-room", (comicId) => {
    const user = { userId: socket.id, room: `Comic: ${comicId}`, roomType: 1 };

    const check = users.find(
      (user) => user.userId === socket.id && user.roomType === 1
    );

    if (!check) {
      users.push(user);
      socket.join(user.room);
    } else {
      users.map((user) => {
        if (user.userId === socket.id && user.roomType === 1) {
          if (user.room !== `Comic: ${comicId}`) {
            socket.leave(user.room);
            socket.join(`Comic: ${comicId}`);
            user.room = `Comic: ${comicId}`;
          }
        }
      });
    }
    // console.log(users);
    // console.log(socket.adapter.rooms);
  });

  socket.on("chapter:join-room", (chapterId) => {
    const user = {
      userId: socket.id,
      room: `Chapter: ${chapterId}`,
      roomType: 1,
    };

    const check = users.find(
      (user) => user.userId === socket.id && user.roomType === 1
    );

    if (!check) {
      users.push(user);
      socket.join(user.room);
    } else {
      users.map((user) => {
        if (user.userId === socket.id && user.roomType === 1) {
          if (user.room !== `Chapter: ${chapterId}`) {
            socket.leave(user.room);
            socket.join(`Chapter: ${chapterId}`);
            user.room = `Chapter: ${chapterId}`;
          }
        }
      });
    }
    // console.log(users);
    // console.log(socket.adapter.rooms);
  });
};

module.exports = joinRoomSocket;
