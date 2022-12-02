// Store Controller
class StoreController {
	static async order(req, res) {
		try {
			res.status(201).json({
				status: "success",
				url: req.url,
				iteration: 1,
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
