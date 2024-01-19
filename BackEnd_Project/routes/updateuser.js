const controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
router.put("/",  controller.updateuserinfo);
module.exports = router;
