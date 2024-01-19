const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const xsrfToken = req.headers["x-xsrf-token"];
  console.log(xsrfToken);
  try {
    jwt.verify(xsrfToken, "tetfvgdsvcs", (err, user) => {
      if (err) {
        return res.status(401).json({ message: "You are not authorized" });
      }
      req.userid = user.userid;
      next();
    });
  } catch (err) {
    res.send(err);
  }
};
module.exports.verifyToken = verifyToken;
