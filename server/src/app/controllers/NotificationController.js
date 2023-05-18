const notificationServices = require("../../services/NotificationServices");
const db = require("../models/index");

// [GET]
const getNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await notificationServices.getNotificationsService(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at comment controller: " + error,
    });
  }
};

module.exports = {
  getNotifications,
};
