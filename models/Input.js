const mongoose = require("mongoose");
const User = require("./User");

const inputsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

module.exports = mongoose.model("Inputs", inputsSchema);
