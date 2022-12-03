const express = require("express");
const serverless = require("serverless-http");
const Pet = require("./routes/Pet");
const Store = require("./routes/Store");
const log = require("lambda-log");
const generateThumbnail = require("./generateThumbnails");

log.options.meta = {
	context: "Handler",
};

const app = express();

// Middlewares
app.use(express.json());

// Add Routes
app.use("/pet", Pet);
app.use("/store", Store);

// Default route
app.use((req, res, next) => {
	log.error("Route not found");
	return res.status(404).json({
		error: "Route not found",
		route: req.url,
	});
});

// Global Error handler middleware
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	log.error(err);
	res.status(statusCode).json({ message: err.message });
	return;
});

// Export the serverless handler with the express app
module.exports = {
	handler: serverless(app, {
		request: (req, event, context) => {
			req.event = event;
			req.context = context;
		},
	}),
	generateThumbnail,
};
