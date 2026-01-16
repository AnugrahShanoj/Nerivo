import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoURL, age, gender },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong!...");
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl p-4">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control  w-full max-w-xs">
                <div className="label py-1 mt-4">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-boardered w-full max-w-xs mb-5"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label py-1">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-boardered w-full max-w-xs mb-5"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label py-1">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="input input-boardered w-full max-w-xs mb-5"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label py-1">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-boardered w-full max-w-xs mb-5"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label py-1">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-boardered w-full max-w-xs mb-5"
                />
              </label>
            </div>
            <p className="text-red-500 font-bold">{error}</p>
            <div className="card-actions justify-center mt-3 px-3 ">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, photoURL, age, gender }} />
      {showToast && (
        <div className="toast toast-top toast-center font-bold ">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
