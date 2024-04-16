import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async () => {
      try {
        const response = await fetch(`https://cabbit-sarthak-kambles-projects.vercel.app/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, email, phoneNumber, password }),
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to sign up");
        }
  
        alert("User registered successfully");
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      }
    };
  return (
    <div className="flex items-center justify-center flex-col gap-3" >
      <div className=" mt-[6%] font-bold text-2xl ">Register</div>
      <input 
        className="border-2 border-gray-300 p-2 m-2 w-[25%]"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Full Name"
      />
      <input 
        className="border-2 border-gray-300 p-2 m-2 w-[25%]"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <input 
        className="border-2 border-gray-300 p-2 m-2 w-[25%]"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="border-2 border-gray-300 p-2 m-2 w-[25%]"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <input 
        className="border-2 border-gray-300 p-2 m-2 w-[25%]"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter Phone Number"
      />
      
      <div className="flex flex-row justify-between gap-3 w-[25%]">
      <button onClick={() => {navigate("/")}} className="border-2 border-slate-400 bg-slate-50 hover:bg-slate-100 px-[5%] w-[50%]">Login</button>
      <button onClick={handleSignUp} className="border-2 border-slate-400 bg-slate-50 hover:bg-slate-100 px-[5%] w-[50%]">Register</button>
      </div>
    </div>
  )
}
