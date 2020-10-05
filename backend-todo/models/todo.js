const mongoose = require("mongoose");
const { uuid } = require("uuidv4");

const todoSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  q: {
    type: String,
    required: true,
  },
  filter: {
    type: String,
  },
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
