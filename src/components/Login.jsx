import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
const [emailId, setEmailId]=useState("");
const [password, setPassword]=useState("");
const [error, setError]= useState("");
const dispatch= useDispatch();
const navigate= useNavigate();

const handleLogin= async()=>{
    try{
        const res= await axios.post(BASE_URL+"/login",
        {
            emailId,
            password
        },
        {withCredentials: true}
    );

    dispatch(addUser(res.data));
    navigate("/");
}
catch(err){
    setError(err?.response?.data || "Something Went Wrong!...");
    console.log(err);
}
}

  return (
    <div className="flex justify-center my-30">
      <div className="card bg-base-300 w-96 shadow-xl p-4">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control  w-full max-w-xs">
              <div className="label py-1 mt-4">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="email"
                value={emailId}
                onChange={(e)=>setEmailId(e.target.value)}
                className="input input-boardered w-full max-w-xs mb-5"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label py-1">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="input input-boardered w-full max-w-xs mb-5"
              />
            </label>
          </div>
          <p className="text-red-500 font-bold">{error}</p>
          <div className="card-actions justify-center mt-3 px-3 ">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
