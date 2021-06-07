const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
const connectDB = async () => {
	try {
		await mongoose.connect(dbConfig.url, {
			useNewUrlParser    : true,
			useUnifiedTopology : true,
			useCreateIndex     : true
		});
		console.log('mongodb connected');
	} catch (err) {
		console.error(err.message);
		// exit process with failure
		process.exit(1);
	}
};
// const db = {};
// db.mongoose = mongoose;
// db.url = dbConfig.url;
// db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = connectDB;
