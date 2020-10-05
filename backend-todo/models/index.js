const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
module.exports.Users = require("./auth");
