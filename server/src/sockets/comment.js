const db = require("../app/models/index");

const commentSocket = (io, socket) => {
  // add comment
  const createComment = async (payload) => {
    const {
      userId,
      comicId,
      chapterId,
      content,
      commentId,
      send,
      inChapterId,
    } = payload;

    if (send === "sendReply") {
      const newReply = await db.Reply.create({
        userId,
        comicId,
        chapterId,
        content,
        commentId,
      });

      const user = await db.User.findOne({
        where: { id: userId },
        attributes: ["id", "fullName", "avatar"],
      });

      if (chapterId) {
        const chapter = await db.Chapter.findOne({
          where: { id: chapterId },
          attributes: ["id", "chapterNumber"],
        });

        io.to(`Chapter: ${chapterId}`).emit("reply:send-create", {
          ...newReply.dataValues,
          chapter,
          user,
        });
        io.to(`Comic: ${comicId}`).emit("reply:send-create", {
          ...newReply.dataValues,
          chapter,
          user,
        });
      } else {
        io.to(`Comic: ${comicId}`).emit("reply:send-create", {
          ...newReply.dataValues,
          user,
        });
        if (inChapterId) {
          io.to(`Chapter: ${inChapterId}`).emit("reply:send-create", {
            ...newReply.dataValues,
            user,
          });
        }
      }
    } else {
      const newComment = await db.Comment.create({
        userId,
        comicId,
        chapterId,
        content,
      });

      const user = await db.User.findOne({
        where: { id: userId },
        attributes: ["id", "fullName", "avatar"],
      });

      if (chapterId) {
        io.to(`Chapter: ${chapterId}`).emit("comment:send-create", {
          ...newComment.dataValues,
          user,
        });

        const chapter = await db.Chapter.findOne({
          where: { id: chapterId },
          attributes: ["id", "chapterNumber"],
        });
        io.to(`Comic: ${comicId}`).emit("comment:send-create", {
          ...newComment.dataValues,
          chapter,
          user,
        });
      } else {
        io.to(`Comic: ${comicId}`).emit("comment:send-create", {
          ...newComment.dataValues,
          user,
        });
      }
    }
  };

  // remove comment
  const deleteComment = async (payload) => {
    const { comicId, chapterId, commentId } = payload;
    await db.Comment.destroy({
      where: { id: commentId },
    });
    await db.Reply.destroy({
      where: { commentId },
    });

    if (chapterId) {
      io.to(`Chapter: ${chapterId}`).emit("comment:send-delete", commentId);
    }
    io.to(`Comic: ${comicId}`).emit("comment:send-delete", commentId);
  };

  // remove reply
  const deleteReply = async (payload) => {
    const { comicId, chapterId, commentId, replyId } = payload;
    await db.Reply.destroy({
      where: { id: replyId },
    });

    if (chapterId) {
      io.to(`Chapter: ${chapterId}`).emit("reply:send-delete", {
        commentId,
        replyId,
      });
    }
    io.to(`Comic: ${comicId}`).emit("reply:send-delete", {
      commentId,
      replyId,
    });
  };

  //
  socket.on("comment:create", createComment);
  socket.on("comment:delete", deleteComment);
  socket.on("reply:delete", deleteReply);
};

module.exports = commentSocket;
