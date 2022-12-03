const Model = require("../models/Store");
const log = require("lambda-log");

log.options.meta = {
	context: "PetController",
};

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
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}

	static async getOrder(req, res) {
		try {
			const { id } = req.params;
			const order = await Model.getOrder(id);

			res.status(200).json({
				status: "success",
				message: "Order retrieved successfully",
				data: {
					order,
				},
			});
		} catch (error) {
			// Catch any errors
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}

	static async deleteOrder(req, res) {
		try {
			const { id } = req.params;
			await Model.deleteOrder(id);

			res.status(200).json({
				status: "success",
				message: "Order deleted successfully",
			});
		} catch (error) {
			// Catch any errors
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}
}

module.exports = StoreController;
