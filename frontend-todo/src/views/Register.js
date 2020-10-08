import React, { useState } from "react";
import { Input, Card, Button, message } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { cardLogin, container, buttonLogin } = styles;

  const [name, setName] = useState();
  const [emailAddress, setEmail] = useState();
  const [passwordUser, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const registerUser = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:3000/auth/register",
        {
          name: name,
          email: emailAddress,
          password: passwordUser,
        },
        { timeout: 30000 }
      )
      .then((res) => {
        setLoading(false);
        message.success("Registration success!");
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        message.info(err.response.data.message);
      });
  };

  return (
    <div style={container}>
      <Card style={cardLogin}>
        <h1 style={{ fontWeight: "bold" }}>TODO LIST APP</h1>
        <h2 style={{ color: "gray" }}>REGISTER</h2>
        <p style={{ marginBottom: "20px" }}>
          Please input your data for registration
        </p>
        <Input
          style={{ marginBottom: "30px" }}
          size="large"
          placeholder="Name"
          prefix={<UserOutlined />}
          onChange={(name) => setName(name.target.value)}
        />
        <Input
          style={{ marginBottom: "30px" }}
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          onChange={(mail) => setEmail(mail.target.value)}
        />
        <Input.Password
          style={{ marginBottom: "30px" }}
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(pass) => setPassword(pass.target.value)}
        />
        <Button
          style={buttonLogin}
          type="primary"
          loading={loading}
          onClick={registerUser}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "gray",
    position: "static",
    height: "100vh",
  },
  cardLogin: {
    width: 500,
    height: 450,
    marginLeft: "auto",
    marginRight: "auto",
    top: "20vh",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  buttonLogin: {
    width: "100%",
    marginBottom: 20,
  },
};

export default Register;
