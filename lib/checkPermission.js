const models = require("../models");

module.exports = {
	isAdmin: (req, res, next) => {
		if(req.decodedToken && req.decodedToken.userData && req.decodedToken.userData.is_admin){
			next();
		} else {
			res.status(403).end(JSON.stringify({message: 'Missing permission'}));
		}
	},

	fetchTokenData: (req, res, next) => {
		return models
			.token
			.findOne({
				where: {
					uuid: req.decodedToken.uuid 
				}
			})
			.then(tokenValue => {
				console.log(" -- tokenValue :- ", tokenValue);

				if(tokenValue) {
					req.tokenData = tokenValue;
					next();
				} else {
					res.status(401).end(JSON.stringify({message: 'Unauthorized'}));
				}
			})
	},

	sameUser: (req, compareObj)  => {
		if(compareObj && (compareObj.user_id == req.tokenData.user_id)) {
			return true;
		}
	
		return false;
	}
}