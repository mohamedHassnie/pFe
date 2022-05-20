const mongoose = require("mongoose");

Markiting = mongoose.Schema({
  Date: { type: Date, default: Date.now() },
  UserName: { type: String, required: true },
  LastName: { type: String, required: true },
  role: {
    type: String,
    required: false,
    default: "markiting",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = Markiting = mongoose.model("Markiting", Markiting);
