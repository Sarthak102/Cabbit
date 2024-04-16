import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch(`https://cabbit-sarthak-kambles-projects.vercel.app/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to log in");
      }

      alert("User logged in successfully");
      navigate("/index", { state: { username: username } });
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col gap-3" >
      <div className=" mt-[10%] font-bold text-2xl ">Login</div>
       <TextField
        id="outlined-controlled"
        className="w-[25%]"
        label="UserName"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter UserName"
      />
      <TextField
        id="outlined-controlled"
        className="w-[25%]"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <div className="flex flex-row justify-between gap-3 w-[25%]">
      <Button variant="contained" onClick={handleLogin} className=" w-[50%]" >Login</Button>
      <Button variant="outlined" onClick={() => {navigate("/register")}} className="w-[50%]">Register</Button>
      </div>
    </div>
  );
};

export default Login;
