const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dashboard", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);
mongoose.Promise = Promise;

const Todo = require("./todo");
const Users = require("./auth");

module.exports.Todo = Todo;
module.exports.Users = Users;
