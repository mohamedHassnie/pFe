const mongoose = require('mongoose');

// const MONGO_URL = 'mongodb://mongo_app/medicale';
const MONGO_URL = 'mongodb://localhost:27017//medicale';

class Database {
  constructor() {
    this.init();
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    mongoose
      .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log('database connected succefully'))
      .catch((e) => {
        console.log('unable to connect to the datbase , error :', e);
      });
  }
}
module.exports = new Database();
