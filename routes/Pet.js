const express = require("express");
const router = express.Router();

const PetController = require("../controllers/Pet");

router.post("/", PetController.create);

module.exports = router;
