const mongoose = require("mongoose");
const { uuid } = require("uuidv4");

const userCredentials = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  name: {
    type: String,
    unique: false,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
});

const userModel = mongoose.model("credentials", userCredentials);

module.exports = userModel;
