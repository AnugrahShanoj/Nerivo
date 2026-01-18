import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
const [emailId, setEmailId]=useState("");
const [password, setPassword]=useState("");
const [firstName, setFirstName]=useState("");
const [lastName, setLastName]=useState("");
const [isLoginForm, setIsLoginForm]=useState(true);
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

const handleSignUp= async()=>{
  try{
    const res = await axios.post(BASE_URL+"/signup", {firstName, lastName, emailId, password}, {withCredentials:true});
  dispatch(addUser(res?.data?.data));
   return navigate("/profile");
  }catch(err){
    setError(err?.response?.data || "Something Went Wrong!...");
    console.log(err);
  }
}

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-xl p-4">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm? "Login" : "Sign Up"}</h2>
          <div>
            {!isLoginForm && (
              <>
              <label className="form-control  w-full max-w-xs">
              <div className="label py-1 mt-4">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                className="input input-boardered w-full max-w-xs mb-5"
              />
            </label>
            <label className="form-control  w-full max-w-xs">
              <div className="label py-1">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                className="input input-boardered w-full max-w-xs mb-5"
              />
            </label>
            </>)}
            <label className="form-control  w-full max-w-xs">
              <div className="label py-1 ">
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
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin : handleSignUp}>Login</button>
          </div>
          <p className="m-auto pt-4 cursor-pointer" onClick={()=>setIsLoginForm((value)=> !value)}>{isLoginForm? "New User? SignUp Here" : "Existing User? Login Here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
