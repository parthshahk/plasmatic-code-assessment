const express = require("express");
const router = express.Router();

const StoreController = require("../controllers/Store");

router.get("/", StoreController.sample);

module.exports = router;
