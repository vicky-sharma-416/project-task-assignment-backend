const express = require("express");
const cors = require("cors");
const tokenFileObj = require('./lib/token.js');
const app = express();

// Add other url to allow CORS
app.use(cors({origin: "http://localhost:8081"}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const models = require("./models");
models.sequelize.sync();

// drop the table if it already exists
// models.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Middleware to sent response with headers
app.use(function(req, res, next){
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

// Open route to get access token
require("./routes/registration.routes.js")(app);
require("./routes/login.routes.js")(app);

// Authorize / validate incoming token
app.use(function(req, res, next){
	if(req.headers && req.headers.authorization) {
		tokenFileObj.verify(req, function(error, result){
			// console.log(error, '-- req: ', result);

			if (error) {
				res.status(401).end(JSON.stringify({message: error.message}));
			} else {
				req.decodedToken = result;
				next();
			}
		})
	}
	else{
		res.status(401).end(JSON.stringify({message: 'Unauthorized'}));
	}
})

require("./routes/user.routes.js")(app);
require("./routes/token.routes.js")(app);
require("./routes/task.routes.js")(app);
require("./routes/project.routes.js")(app);
require("./routes/projectUser.routes.js")(app);
require("./routes/projectTask.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
