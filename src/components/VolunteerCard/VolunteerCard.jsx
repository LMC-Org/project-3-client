import { Link, useNavigate } from "react-router-dom";
import "./VolunteerCard.css";
import { useState } from "react";

const VolunteerCard = (props) => {
    const navigate = useNavigate();
    const { _id, location, email, phone, name, profilePicture } = props.volunteer;
    const postId = props.postId;
    const setStuff = props.setStuff

    const chooseVolunteer = () => {
        navigate(`/help-post/${postId}`);
        const reqBody = {
            volunteerId: _id,
            postId
        }
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
        fetch(`${BACKEND_ROOT}/help-post/selectvolunteer`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        })
            .then(response => response.json())
            .then(() => {
                setStuff();
            })
            .catch((error) => (console.error(error)));
    }

    return (
        <>
            <div className="volunteerCard-link">
                <Link to={`/user/${_id}`} >
                    <div className="volunteerCard-card" >
                        <img className="image-volunteerCard" src={profilePicture} alt="" />
                        {phone ? (<p className="email-volunteerCard">Tel.: {phone}</p>) : <></>}
                        <p className="email-volunteerCard">Email: {email}</p>
                        {location === undefined ? <p></p> : <p className="location-volunteerCard">Location: {location}</p>}
                        <p className="name-volunteerCard">Name: {name}</p>
                    </div>
                </Link>
                <button className="btn-custom-style" onClick={chooseVolunteer}>Choose this volunteer!!</button>
            </div>
        </>
    );
};

export default VolunteerCard;