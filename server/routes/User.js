const { Router } = require("express");
const router = Router();
const checkToken = require("../middlewares/checkToken");
const {
  createUser,
  login,
  verifyToken,
  getUsers,
} = require("../controllers/User");

router.post("/", createUser);
router.post("/login", login);
router.get("/verify", [checkToken], verifyToken);
router.get("/", [checkToken], getUsers);

module.exports = router;
