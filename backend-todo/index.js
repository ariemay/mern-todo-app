const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwttoken = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;

const db = require("./models/");

app.use(bodyParser.json());
app.use(cors());

function success(res, payload) {
  return res.status(200).json(payload);
}

app.post("/auth/login", async (req, res, next) => {
  try {
    const users = await db.Users.findOne({
      email: req.body.email,
      password: req.body.password,
    }).then((user) => {
      if (!user) {
        res.status(400).send({
          message: "Failed email/password",
        });
      } else {
        const token = jwttoken.sign(
          { id: user._id, name: user.name, email: user.email },
          process.env.SECRET
        );
        res.header("Access-Control-Expose-Headers", "Authorization");
        res.header("Authorization", token);
        return user;
      }
    });
    return success(res, users);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/auth/register", async (req, res, next) => {
  try {
    const users = await db.Users.create(req.body);
    return success(res, users);
  } catch (err) {
    next({ status: 400, message: "Failed to register, please try again" });
  }
});

app.get("/todo", async (req, res, next) => {
  var decoded = jwttoken.verify(req.headers.authorization, process.env.SECRET);
  if (decoded) {
    try {
      const todos = await db.Todo.find({});
      return success(res, todos);
    } catch (err) {
      next({ status: 400, message: "failed to get todos" });
    }
  }
});

app.post("/todo/user", async (req, res, next) => {
  try {
    const todos = new Promise((resolve, reject) => {
      if (req.body.filter === "All") {
        db.Todo.find({}).then((todo) => {
          resolve(todo);
        });
      } else {
        db.Todo.findOne({ filter: req.body.filter }).then((todo) => {
          if (todo) {
            console.log(todo);
            resolve(todo);
          } else {
            reject("No todo available on list");
          }
        });
      }
    });
    todos
      .then((todo) => {
        return success(res, todo);
      })
      .catch((err) => next({ status: 400, message: err }));
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/todo", async (req, res, next) => {
  var decoded = jwttoken.verify(req.headers.authorization, process.env.SECRET);
  if (decoded) {
    try {
      const todo = await db.Todo.create(req.body);
      return success(res, todo);
    } catch (err) {
      next({ status: 400, message: "failed to create todo" });
    }
  }
});

app.put("/todo/:id", async (req, res, next) => {
  var decoded = jwttoken.verify(req.headers.authorization, process.env.SECRET);
  if (decoded) {
    try {
      const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return success(res, todo);
    } catch (err) {
      next({ status: 400, message: "failed to update todo" });
    }
  }
});
app.delete("/todo/:id", async (req, res, next) => {
  var decoded = jwttoken.verify(req.headers.authorization, process.env.SECRET);
  if (decoded) {
    try {
      await db.Todo.findByIdAndRemove(req.params.id);
      return success(res, "todo deleted!");
    } catch (err) {
      next({ status: 400, message: "failed to delete todo" });
    }
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
