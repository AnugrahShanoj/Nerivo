import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const {_id, firstName, lastName, age, gender, photoURL, skills}= user;
    const dispatch= useDispatch();

    const handleSendRequest= async(status, userId)=>{
      try{
        const res= await axios.post(BASE_URL+"/request/send/"+status+"/"+userId, {}, {withCredentials:true});
        console.log(res);
        dispatch(removeUserFromFeed(userId));
      }catch(err){
        console.log(err);
      }
    }
  return (
    <div className="card bg-base-300 w-96 shadow-sm p-5">
      <figure>
        <img
          src={photoURL}
          alt="Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{skills}</p>
        {age && gender && <p>{age + ", " + gender}</p>}
        <div className="card-actions justify-center my-6">
        <button className="btn btn-primary me-4" onClick={()=>handleSendRequest("ignored", _id)}>Ignored</button>
          <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
