const { UserModel } = require("../Model/User.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.send("Please Login");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
      if (err) {
        res.send("Please login");
      } else {
        const userId = decoded.userId;
        req.userId = userId;
        next();
      }
    });
  }
};
module.exports = { authentication };
