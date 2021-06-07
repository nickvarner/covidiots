const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
	// create a reference to the user model
	user            : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'user'
	},
	age             : {
		type : Number
	},
	gender          : {
		type : String
	},
	politicalParty  : {
		type : String
	},
	bio             : {
		type : String
	},
	personalityTags : {
		type : [ String ]
	},
	social          : {
		youtube   : {
			type : String
		},
		twitter   : {
			type : String
		},
		facebook  : {
			type : String
		},
		instagram : {
			type : String
		}
	},
	date            : {
		type    : Date,
		default : Date.now
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
