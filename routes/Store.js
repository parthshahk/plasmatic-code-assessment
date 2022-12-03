const express = require("express");
const router = express.Router();

const StoreController = require("../controllers/Store");
const Validator = require("../validators/Store");

// @route  POST /order
// @desc   Place an order for a pet
router.post("/order", Validator.order(), StoreController.order);

// @route  GET /order/:id
// @desc   Get purchase order by id
router.get("/order/:id", Validator.getOrder(), StoreController.getOrder);

// @route  DELETE /order/:id
// @desc   Delete purchase order by id
router.delete("/order/:id", Validator.getOrder(), StoreController.deleteOrder);

module.exports = router;
