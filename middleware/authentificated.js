const jwt = require("jsonwebtoken");
//const { jwtSecret } = require('../config/keys');
const SECRET_KEY = process.env.SECRET_KEY;

exports.authenticatateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      errorMessage: "No token. Authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.log("jwt error: ", err);
    res.status(401).json({
      errorMessage: "Invalid token",
    });
  }
};
