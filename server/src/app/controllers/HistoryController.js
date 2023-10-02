const historyServices = require("../../services/HistoryServices");

const getHistory = async (req, res) => {
  try {
    const { page, limit, type } = req.query;
    const userId = req.params.userId;
    const response = await historyServices.getHistoryService(
      page,
      limit,
      type,
      userId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Follow controller: " + error,
    });
  }
};

const getHistoryByComicIds = async (req, res) => {
  try {
    const { page, limit, type, ids } = req.query;
    const comicIds = ids.split(",");
    const response = await historyServices.getHistoryByComicIdsService(
      page,
      limit,
      type,
      comicIds
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Follow controller: " + error,
    });
  }
};

const addHistory = async (req, res) => {
  try {
    const { userId, comicId } = req.params;
    const { chapterIds, chapterId } = req.query;
    const response = await historyServices.addHistoryService(
      userId,
      comicId,
      chapterIds,
      chapterId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Author controller: " + error,
    });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { userId, comicId } = req.params;
    const response = await historyServices.deleteHistoryService(
      userId,
      comicId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Author controller: " + error,
    });
  }
};

module.exports = {
  getHistory,
  getHistoryByComicIds,
  addHistory,
  deleteHistory,
};
