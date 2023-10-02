const ratingServices = require("../../services/RatingServices");

// const getHistory = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const response = await historyServices.getHistoryService(id);
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json({
//       err: -1,
//       msg: "Failed at Follow controller: " + error,
//     });
//   }
// };

const addRating = async (req, res) => {
  try {
    const { userId, comicId } = req.params;
    console.log(req.body);
    const response = await ratingServices.addRatingService(
      req.body,
      userId,
      comicId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Rating controller: " + error,
    });
  }
};

const getRatings = async (req, res) => {
  try {
    const { type, page, limit } = req.query;
    const comicId = req.params.comicId;
    const response = await ratingServices.getRatingsService(
      comicId,
      page,
      limit,
      type
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at rating controller: " + error,
    });
  }
};

module.exports = {
  addRating,
  getRatings,
};
