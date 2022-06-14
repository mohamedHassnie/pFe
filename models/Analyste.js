const mongoose = require("mongoose");

Analyste = mongoose.Schema({
  Date: { type: Date, default: Date.now() },
  fileName: {
    type: "String",
    required: false,
  },
  UserName: { type: String, required: true },
  LastName: { type: String, required: true },
  role: {
    type: String,
    required: false,
    default: "analyste",
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

module.exports = Analyste = mongoose.model("Analyste", Analyste);
