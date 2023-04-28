const multer = require("multer");
const path = require("path");
const cloudinary = require("../../util/cloudinary");
const chapterServices = require("../../services/ChapterServices");

const getChapters = async (req, res) => {
  try {
    const response = await chapterServices.getChaptersService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Chapter controller: " + error,
    });
  }
};

const createChapter = async (req, res) => {
  try {
    if (!req.body.comic || !req.body.chapterNumber)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });

    const urls = [];
    const ids = [];
    const files = req.files;

    if (files?.length > 0) {
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinary.uploads(path);
        urls.push(newPath?.url);
        ids.push(newPath?.id);
      }
    }

    const info = {
      comicId: req.body.comic,
      chapterNumber: req.body.chapterNumber,
      title: req.body.title,
      pictureUrls: urls.length > 0 ? JSON.stringify(urls) : "",
      cloudIds: ids.length > 0 ? JSON.stringify(ids) : "",
    };

    const response = await chapterServices.creatChapterService(info);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Chapter controller: " + error,
    });
  }
};

const getSingleChapter = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await chapterServices.getSingleChapterService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Chapter controller: " + error,
    });
  }
};

const updateChapter = async (req, res) => {
  try {
    if (!req.body.chapterNumber)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });

    const urls = [];
    const ids = [];
    const files = req.files;

    if (files?.length > 0) {
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinary.uploads(path);
        urls.push(newPath?.url);
        ids.push(newPath?.id);
      }
    }

    const info = {
      chapterNumber: req.body.chapterNumber,
      title: req.body.title,
      pictureUrls: urls.length > 0 ? JSON.stringify(urls) : "",
      cloudIds: ids.length > 0 ? JSON.stringify(ids) : "",
    };

    const id = req.params.id;

    const response = await chapterServices.updateChapterService(info, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Comic controller: " + error,
    });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await chapterServices.deleteChapterService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Chapter controller: " + error,
    });
  }
};

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  limits: { fileSize: "10000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
}).array("images");

module.exports = {
  getChapters,
  createChapter,
  getSingleChapter,
  updateChapter,
  deleteChapter,
  upload,
};
