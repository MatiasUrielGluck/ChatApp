const { Router } = require("express");
const router = Router();
const checkToken = require("../middlewares/checkToken");
const { createChat } = require("../controllers/Chat");

router.post("/", [checkToken], createChat);

module.exports = router;
