const express = require("express");
const router = express.Router();

const PetController = require("../controllers/Pet");
const Validator = require("../validators/Pet");

router.post("/", Validator.createPet(), PetController.create);

router.post("/getUploadSignedURL", Validator.getUploadSignedURL(), PetController.getUploadSignedURL);

module.exports = router;
