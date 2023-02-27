const { checkJWT } = require("../helpers/jwt");

const checkToken = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(403).json({
      status: "error",
      code: 403,
      data: "A token must be provided to access this route",
    });
  }

  const result = checkJWT(token);

  if (result.status === "error") {
    return res.status(403).json({
      status: "error",
      code: 403,
      data: "A valid token must be provided to access this route",
    });
  }

  req.decodedToken = result;

  next();
};

module.exports = checkToken;
