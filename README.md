# covidiots

must have mongo for the backend
clone github
create a file in /config/dbconfig.js

///-------------------------------------
module.exports = {
	HOST     : 'localhost',
	port     : 27017,
	DB       : 'covidiots_db',
	url      : 'mongodb://localhost:27017/covidiots_db',
	jwtToken : 'secret-covidiot-token'
};
///-----------------------



npm install // install dependencies
start mongo in terminal using 'mongod'
'npm run dev' in new terminal runs npm start and backend at the same time
