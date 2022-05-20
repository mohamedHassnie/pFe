const mongoose = require("mongoose");
const URI = `mongodb://test:test@mongo_app:27020/PLateformemedicaLe`;
const connectDB = () => {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connecté`);
  } catch (error) {
    console.log(`MongoDB error when connecting: ${error}`);
  }
};
connectDB();
