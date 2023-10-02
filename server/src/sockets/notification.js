const db = require("../app/models/index");

const notificationSocket = (io, socket) => {
  // notify when add new chapter
  const createNotification = async (payload) => {
    const { comicId, chapterId, ...data } = payload;

    const find = await db.Follow.findAll({
      where: { comicId },
      attributes: ["userId"],
    });
    const arr = find.map((item) => item.userId);

    for (let userId of arr) {
      const newNotification = await db.Notification.create({
        userId,
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

      io.to(`User: ${userId}`).emit("notification:send-create", {
        ...newNotification.dataValues,
        Chapter: { ...chapter.dataValues, Comic: { ...comic.dataValues } },
      });
    }
  };

  // mark as read notifications
  const readNotification = async (payload) => {
    const { userId, id, read } = payload;

    if (id === -1) {
      await db.Notification.update(
        { read },
        {
          where: { userId },
        }
      );
    } else {
      await db.Notification.update(
        { read },
        {
          where: { id },
        }
      );
    }

    io.to(`User: ${userId}`).emit("notification:send-read", id, read);
  };

  // remove notification
  const deleteNotification = async (payload) => {
    const { userId, id } = payload;
    await db.Notification.destroy({
      where: { id },
    });

    io.to(`User: ${userId}`).emit("notification:send-delete", id);
  };

  //
  socket.on("notification:create", createNotification);
  socket.on("notification:read", readNotification);
  socket.on("notification:delete", deleteNotification);
};

module.exports = notificationSocket;
