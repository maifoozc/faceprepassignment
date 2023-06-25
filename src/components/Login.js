import React, { useState } from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // This function is used to check if the login credentials are correct.
  let checkLogin = () => {
    if (username == "") {
      alert("username required");
    } else if (password == "") {
      alert("password required");
    }else if(username !== 'foo'){
        alert("Username Incorrect");
    }else if(password !== 'bar'){
        alert("Password Incorrect");
    }else{
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        navigate('/Home');
    }
  };

  return (
    <div className="login_page">
      <Box className="login_box">
        <h2>Log In</h2>
        <Typography>Username</Typography>
        <TextField
          size="small"
          sx={{ marginBottom: "5%" }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Typography>Password</Typography>
        <TextField
          size="small"
          sx={{ marginBottom: "5%" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          variant="outlined"
          sx={{ marginTop: "5%" }}
          onClick={checkLogin}
        >
          Login
        </Button>
      </Box>
    </div>
  );
}

export default Login;
