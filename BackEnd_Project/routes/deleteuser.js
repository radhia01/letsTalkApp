const controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
router.delete("/", controller.deleteUser);
module.exports = router;
