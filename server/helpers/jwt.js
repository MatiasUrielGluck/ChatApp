const jwt = require("jsonwebtoken");

const genJWT = (id, username) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: id,
      username: username,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Failed to generate token");
        }

        resolve(token);
      }
    );
  });
};

const checkJWT = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_SEED);
    return {
      status: "success",
      data: decoded,
    };
  } catch (err) {
    return {
      status: "error",
    };
  }
};

module.exports = { genJWT, checkJWT };
