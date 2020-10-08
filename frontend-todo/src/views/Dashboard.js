import React, { useState, useEffect } from "react";
import { Col, Row, Input, Select, message, Divider, Button } from "antd";
import axios from "axios";
import secureStorage from "../utils/SecureStorage";

const Dashboard = () => {
  const { container, containerInside } = styles;

  const token = secureStorage.getItem("credentials");

  const { Option } = Select;

  const [todoInput, setTodo] = useState("");
  const [todoCategory, setTodoCategory] = useState("Undone");
  const [listTodo, setListTodo] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/todo", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setListTodo(res.data);
      });
  }, [token]);

  const filterTodo = (value) => {
    axios
      .post("http://localhost:3000/todo/user", {
        filter: value,
      })
      .then((res) => {
        var newData = [];
        if (res.data.length > 1) {
          setListTodo(res.data);
        } else {
          newData.push(res.data);
          setListTodo(newData);
        }
      });
  };

  const submitTodo = () => {
    axios
      .post(
        "http://localhost:3000/todo",
        {
          q: todoInput,
          filter: todoCategory,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        let newData = listTodo;
        newData.push(res.data);
        setListTodo(newData);
        message.success("Todo Submitted");
        setTodo("");
        setTodoCategory("Undone");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <div>
      <div style={container}>
        <Row style={containerInside}>
          <Col style={{ padding: 10 }} flex={1}>
            <div>
              <h3>Filter</h3>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Status"
                defaultValue={"Undone"}
                onChange={(value) => {
                  filterTodo(value);
                }}
              >
                <Option value="Undone">Undone</Option>
                <Option value="Done">Done</Option>
                <Option value="All">All</Option>
              </Select>
            </div>
            <Divider />
          </Col>
          <Col style={{ padding: 10 }} flex={4}>
            <Input
              placeholder="Fill todo... and press Enter on Keyboard"
              style={{
                width: "60%",
              }}
              onChange={(data) => {
                setTodo(data.target.value);
              }}
              value={todoInput}
              onPressEnter={() => {
                submitTodo();
              }}
            />
            <Select
              showSearch
              style={{ width: 200, marginLeft: "30px" }}
              placeholder="Status"
              defaultValue={"Undone"}
              onChange={(value) => {
                setTodoCategory(value);
              }}
            >
              <Option value="Undone">Undone</Option>
              <Option value="Done">Done</Option>
            </Select>
            <div style={{ marginTop: "40px" }}>
              {listTodo !== undefined
                ? listTodo.map((todo, index) => TodoListing(todo, index, token))
                : ""}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const deleteTodo = (id, token) => {
  axios
    .delete(`http://localhost:3000/todo/${id}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      message.success("Success deleting your todo");
    })
    .catch((err) => {
      message.error(err);
    });
};

const TodoListing = (todo, index, token) => {
  return (
    <Row>
      <div
        key={index}
        style={{
          width: "80%",
          height: 40,
          marginBottom: 10,
          border: "0.1px solid black",
          padding: 10,
          marginRight: 10,
        }}
      >
        <span>{todo.q}</span>
        <span style={{ float: "right" }}>{todo.filter.toUpperCase()}</span>
      </div>
      <Button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={() => deleteTodo(todo._id, token)}
      >
        DELETE
      </Button>
    </Row>
  );
};

const styles = {
  container: {
    width: "95vw",
    height: "90vh",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    border: "0.5px solid black",
    borderRadius: "20px",
  },
  containerInside: {
    padding: "40px",
  },
};

export default Dashboard;
