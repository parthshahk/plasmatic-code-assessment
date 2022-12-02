const express = require("express");
const router = express.Router();

const PetController = require("../controllers/Pet");
const Validator = require("../validators/Pet");

router.post("/", Validator.createPet(), PetController.create);

router.post("/getUploadSignedURL", Validator.getUploadSignedURL(), PetController.getUploadSignedURL);

router.get("/findByStatus", Validator.findByStatus(), PetController.findByStatus);

router.get("/:id", PetController.get);

router.post("/:id", Validator.createPet(), PetController.update);

router.delete("/:id", Validator.getPet(), PetController.delete);

module.exports = router;
