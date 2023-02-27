const { Router } = require("express");
const router = Router();

const { createUser, login } = require("../controllers/User");

router.post("/", createUser);
router.post("/login", login);

module.exports = router;
