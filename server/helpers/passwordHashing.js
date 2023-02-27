const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

const checkPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hashPassword, checkPassword };
