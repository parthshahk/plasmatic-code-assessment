const express = require("express");
const router = express.Router();

const PetController = require("../controllers/Pet");
const Validator = require("../validators/Pet");

// @route  POST /
// @desc   Create a new pet
router.post("/", Validator.createPet(), PetController.create);

// @route  POST /getUploadSignedURL
// @desc   Get upload signed url
router.post("/getUploadSignedURL", Validator.getUploadSignedURL(), PetController.getUploadSignedURL);

// @route  GET /findByStatus
// @desc   Find pets by status
router.get("/findByStatus", Validator.findByStatus(), PetController.findByStatus);

// @route  GET /:id
// @desc   Get pet by id
router.get("/:id", PetController.get);

// @route  POST /:id
// @desc   Update pet by id
router.post("/:id", Validator.createPet(), PetController.update);

// @route  DELETE /:id
// @desc   Delete pet by id
router.delete("/:id", Validator.getPet(), PetController.delete);

module.exports = router;
