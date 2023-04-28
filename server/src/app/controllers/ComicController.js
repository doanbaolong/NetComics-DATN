const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const comicServices = require("../../services/ComicServices");

const getComics = async (req, res) => {
  try {
    const response = await comicServices.getComicsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Comic controller: " + error,
    });
  }
};

const createComic = async (req, res) => {
  try {
    // const url = req.protocol + "://" + req.get("host");
    const authors = [];
    const genres = [];
    if (req.body.authors) {
      for (let author of req.body.authors.split(",")) {
        authors.push(+author);
      }
    }
    if (req.body.genres) {
      for (let genre of req.body.genres.split(",")) {
        genres.push(+genre);
      }
    }
    const info = {
      name: req.body.name,
      otherName: req.body.otherName,
      authors: authors,
      genres: genres,
      content: req.body.content,
      status: req.body.status,
      slug: req.body.slug,
      image: req.file ? "/uploads/comics/" + req.file.filename : "",
    };

    if (!req.body.name)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await comicServices.creatComicService(info);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Comic controller: " + error,
    });
  }
};

const getSingleComic = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await comicServices.getSingleComicService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Comic controller: " + error,
    });
  }
};

const updateComic = async (req, res) => {
  try {
    const authors = [];
    const genres = [];
    if (req.body.authors) {
      for (let author of req.body.authors.split(",")) {
        authors.push(+author);
      }
    }
    if (req.body.genres) {
      for (let genre of req.body.genres.split(",")) {
        genres.push(+genre);
      }
    }
    const info = {
      name: req.body.name,
      otherName: req.body.otherName,
      authors: authors,
      genres: genres,
      content: req.body.content,
      status: req.body.status,
      slug: req.body.slug,
    };

    if (req.file) {
      info.image = "/uploads/comics/" + req.file.filename;
    }

    if (!req.body.name)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });

    const id = req.params.id;
    const response = await comicServices.updateComicService(info, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Comic controller: " + error,
    });
  }
};

const deleteComic = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await comicServices.deleteComicService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Comic controller: " + error,
    });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads/comics/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

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
}).single("image");

module.exports = {
  getComics,
  createComic,
  getSingleComic,
  updateComic,
  deleteComic,
  upload,
};
