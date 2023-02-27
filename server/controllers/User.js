const { request, response } = require("express");
const { hashPassword, checkPassword } = require("../helpers/passwordHashing");
const internalMsg = require("../helpers/internalMsg");
const User = require("../models/User");

const createUser = async (req = request, res = response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      msg: "Invalid username or password values.",
    });
  }

  try {
    // Check that user does not exist on database
    const matchingUsers = await User.findAll({
      where: {
        username,
      },
    });
    if (matchingUsers.length) {
      return res.status(400).json({
        msg: "User already exists in database.",
      });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "User created.",
      newUser: {
        id: newUser.id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: internalMsg.internalError,
    });
  }
};

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(403).json({
        msg: internalMsg.invalidLogin,
      });
    }

    const hashedPassword = user.password;
    if (!checkPassword(password, hashedPassword)) {
      return res.status(403).json({
        msg: internalMsg.invalidLogin,
      });
    }

    return res.status(200).json({
      msg: "Logged in.",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: internalMsg.internalError,
    });
  }
};

module.exports = {
  createUser,
  login,
};
