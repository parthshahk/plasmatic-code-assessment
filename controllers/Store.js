const Model = require("../models/Store");
const { v4: uuidv4 } = require("uuid");

// Store Controller
class StoreController {
	static async order(req, res) {
		try {
			const order = req.body;
			const orderId = await Model.order(order);

			res.status(201).json({
				status: "success",
				message: "Order created successfully",
				data: {
					orderId,
				},
			});
		} catch (error) {
			// Catch any errors
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}
}

module.exports = StoreController;
