import React, { useState } from "react";
import { Input, Card, Button, message } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import secureStorage from "../utils/SecureStorage";

const Login = () => {
  const { cardLogin, container, buttonLogin } = styles;

  const history = useHistory();

  const [emailAddress, setEmail] = useState();
  const [passwordUser, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    let token = secureStorage.getItem("credentials");
    console.log(token);
    if (token) {
      history.push("/dashboard");
    }
  }, []);

  const storeData = async (res) => {
    secureStorage.setItem("credentials", res.headers.authorization);
    secureStorage.setItem("username", res);
  };

  const getLogin = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:3000/auth/login",
        {
          email: emailAddress,
          password: passwordUser,
        },
        { timeout: 30000 }
      )
      .then((res) => {
        setLoading(false);
        storeData(res).then(() => {
          history.push("/dashboard");
        });
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
        <h2 style={{ color: "gray" }}>LOGIN</h2>
        <p style={{ marginBottom: "20px" }}>
          Please login before using this application
        </p>
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
          onPressEnter={getLogin}
        />
        <Button
          style={buttonLogin}
          type="primary"
          loading={loading}
          onClick={getLogin}
        >
          Login
        </Button>
        <Link style={{ color: "black" }} to={"/register"}>
          Register
        </Link>
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
    height: 400,
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

export default Login;
