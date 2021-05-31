//

const mongoose = require('mongoose');
require('dotenv').config()

if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect(`mongodb+srv://tristanlerisse:${process.env.DB_PASSWORD}@hackreactor-ta.gked8.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-61uwl6-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true});
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db... 🍕');
})

module.exports.db = db