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

const getComicsLimit = async (req, res) => {
  try {
    const { genre, nogenre, minchapter, status, sort, page, limit } = req.query;
    const query = {};
    if (genre) {
      query.genre = genre.split(",");
    }
    if (nogenre) {
      query.nogenre = nogenre.split(",");
    }
    if (minchapter) {
      query.minchapter = minchapter;
    }
    if (status === "1") {
      query.status = "Đang tiến hành";
    } else if (status === "2") {
      query.status = "Hoàn thành";
    }
    if (sort === "0") {
      query.sort = "chapterUpdatedAt";
    } else if (sort === "1") {
      query.sort = "createdAt";
    } else if (sort === "2") {
      query.sort = "follower";
    } else if (sort === "3") {
      query.sort = "chapterNumber";
    }

    const response = await comicServices.getComicsLimitService(
      page,
      limit,
      query
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Comic controller: " + error,
    });
  }
};

const searchComics = async (req, res) => {
  try {
    const { keyword, type, page, limit } = req.query;
    const query = {};
    if (keyword) {
      query.keyword = keyword;
    }
    const response = await comicServices.searchComicsService(
      page,
      limit,
      type,
      query
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Comic controller: " + error,
    });
  }
};

const getComicsByGenreLimit = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const genre = req.params.genre;
    const response = await comicServices.getComicsLimitByGenreService(
      page,
      limit,
      genre
    );
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
      chapterNumber: 0,
      follower: 0,
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

const getSingleComicBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const response = await comicServices.getSingleComicBySlugService(slug);
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
  getComicsLimit,
  getComicsByGenreLimit,
  searchComics,
  createComic,
  getSingleComic,
  getSingleComicBySlug,
  updateComic,
  deleteComic,
  upload,
};
