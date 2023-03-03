const { Router } = require("express");
const router = Router();
const checkToken = require("../middlewares/checkToken");
const { getMessageListForUser } = require("../controllers/Message");

router.get("/", [checkToken], getMessageListForUser);

module.exports = router;
