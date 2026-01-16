import React from "react";

const UserCard = ({user}) => {
    const {firstName, lastName, age, gender, photoURL, skills}= user;
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
        <button className="btn btn-primary me-4">Ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
