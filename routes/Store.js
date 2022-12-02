const express = require("express");
const router = express.Router();

const StoreController = require("../controllers/Store");
const Validator = require("../validators/Store");

router.post("/order", StoreController.sample);

module.exports = router;
