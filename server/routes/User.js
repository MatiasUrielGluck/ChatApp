const { Router } = require("express");
const router = Router();
const checkToken = require("../middlewares/checkToken");
const { createUser, login, verifyToken } = require("../controllers/User");

router.post("/", createUser);
router.post("/login", login);
router.get("/verify", [checkToken], verifyToken);

module.exports = router;
