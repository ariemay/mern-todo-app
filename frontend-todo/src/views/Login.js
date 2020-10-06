import React from "react";
import axios from "axios";
import secureStorage from "../utils/SecureStorage";

const Login = () => {
  React.useEffect(() => {
    let token = secureStorage.getItem("credentials");
    console.log(token);
  }, []);

  return <div>Hello</div>;
};

export default Login;
