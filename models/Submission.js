const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
	// we want the submission to connect to a user so we need to add that
	user        : {
		type : Schema.Types.ObjectId,
		ref  : 'users'
	},
	userName    : {
		type : String
	},
	avatar      : {
		type : String
	},
	url         : {
		type     : URL,
		required : True
	},
	title       : {
		type     : String,
		required : True
	},
	description : {
		type : String
	},
	imgUrl      : {
		type : URL
	},
	author      : {
		type : String
	},
	content     : {
		type : String
	},
	published   : {
		type : Date
	},
	date        : {
		type    : Date,
		default : Date.now
	},
	votes       : [
		{
			user : {
				type : Schema.Types.ObjectId,
				ref  : 'users'
			}
		}
	],
	comments    : [
		{
			user     : {
				type : Schema.Types.ObjectId,
				ref  : 'users'
			},
			text     : {
				type     : String,
				required : True
			},
			userName : {
				type : String
			},
			avatar   : {
				type : String
			}
		}
	],
	date        : {
		type    : Date,
		default : Date.now
	}
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);
