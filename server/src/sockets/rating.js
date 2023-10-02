const db = require("../app/models/index");
const redisClient = require("../app/config/redis");

const ratingSocket = (io, socket) => {
  // rating
  const ratingCreate = async (payload) => {
    const { rating, userId, comicId } = payload;

    const newRating = await db.Rating.create({
      userId,
      comicId,
      ...rating,
    });

    redisClient.del(`comic:${comicId}`);

    const user = await db.User.findOne({
      where: { id: userId },
      attributes: ["fullName", "avatar"],
    });

    io.to(`Comic: ${comicId}`).emit("rating:send-create", {
      ...newRating.dataValues,
      User: user,
    });
  };

  // remove notification
  const deleteRating = async (payload) => {
    const { userId, comicId } = payload;
    await db.Rating.destroy({
      where: { userId, comicId },
    });
    redisClient.del(`comic:${comicId}`);

    io.to(`Comic: ${comicId}`).emit("rating:send-delete", userId);
  };

  //
  socket.on("rating:create", ratingCreate);
  socket.on("rating:delete", deleteRating);
};

module.exports = ratingSocket;
