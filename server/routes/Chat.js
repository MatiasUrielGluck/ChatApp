const { Router } = require("express");
const router = Router();
const checkToken = require("../middlewares/checkToken");
const { createChat, getChatListForUser } = require("../controllers/Chat");

router.post("/", [checkToken], createChat);
router.get("/", [checkToken], getChatListForUser);

module.exports = router;
