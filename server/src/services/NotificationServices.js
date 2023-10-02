const db = require("../app/models/index");

const getNotificationsService = (userId, page, limit, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageLimit = +limit;
      if (type === "less") {
        pageLimit = 10;
      } else {
        pageLimit = +limit;
      }
      const response = await db.Notification.findAndCountAll(
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
          offset: page * pageLimit || 0,
          limit: pageLimit,
          distinct: true,
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
        response: { ...response, unread },
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getNotificationsService,
};
