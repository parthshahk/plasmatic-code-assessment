const express = require("express");
const router = express.Router();

const PetController = require("../controllers/Pet");

router.get("/", PetController.sample);

module.exports = router;
