const jwt = require("jsonwebtoken");
const db = require("../app/models/index");

const isAuthentication = (req, res, next) => {
  let accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken)
    return res.status(401).json({
      err: 1,
      msg: "Missing access token",
    });

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({
        err: 1,
        msg: "Access token is expired",
      });

    req.user = user;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await db.User.findOne({ where: { id } });
    if (user && user.role === "ADM") {
      next();
    }
  } catch (error) {
    return res.status(401).send("Authentication is invalid");
  }
};

module.exports = { isAuthentication, isAdmin };
