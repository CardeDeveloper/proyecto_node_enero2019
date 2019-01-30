//set up mongoose connection
const mongoose = require ('mongoose');
const mongoDB = 'mongodb://localhost/proyecto_tecgurus_2019';

mongoose.connect(mongoDB);
mongoose.Promise= global.Promise;
module.exports= mongoose;