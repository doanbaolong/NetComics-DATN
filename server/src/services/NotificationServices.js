const db = require("../app/models/index");

const getNotificationsService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Notification.findAll(
        {
          where: { userId },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.User,
              attributes: ["id", "fullName", "avatar"],
            },
            {
              model: db.Chapter,
              attributes: ["id", "chapterNumber"],
              include: {
                model: db.Comic,
                attributes: ["name", "slug", "image"],
              },
            },
          ],
        },
        { raw: true },
        { nest: true }
      );
      const unread = await db.Notification.count({
        where: { userId, read: false },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get all Notifications",
        response: { response, unread },
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getNotificationsService,
};
