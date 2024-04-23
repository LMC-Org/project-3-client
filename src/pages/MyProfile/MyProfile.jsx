import "./MyProfile.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import Loading from "../../components/Loading/Loading";
import PostCard from "../../components/PostCard/PostCard";


function MyProfile() {
    const { user } = useContext(AuthContext);
    const userIdFromAuth = user._id
    const [userData, setUserData] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const [helpPostsArray, setHelpPostsArray] = useState([])
    const [HelpPostIVolunteered, setHelpPostIVolunteered] = useState([])
    const [HelpPostIHaveBeenChosen, setHelpPostIHaveBeenChosen] = useState([])
    const [skills, setSkills] = useState([])
    const skillsString = userData.skills ? userData.skills.join(' + ') : ''


    const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        fetch(`${BACKEND_ROOT}/user/${userIdFromAuth}`)
            .then((response) => {
                
                return response.json();
            })
            .then((jsonData) => {
                setUserData(jsonData);
                setHelpPostsArray(jsonData.helpPosts)
                setSkills(jsonData.skills/* .join(',') */)
                setProfilePicture(jsonData.profilePicture)
                console.log("USERDATA", jsonData)

            })
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        fetch(`${BACKEND_ROOT}/help-post/volunteered/${userIdFromAuth}`)
            .then((response2) => {
                return response2.json();
            })
            .then((jsonData2) => {
                setHelpPostIVolunteered(jsonData2.allHelpPostsIVolunteered)
                setHelpPostIHaveBeenChosen(jsonData2.allHelpPostsIWasChosen)
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <>
            {userData ?
                <div className="profile-container">
                    <div className="profile-card">

                        <div className="user-details-picture-responsive">
                            <div className="profile-picture-container">
                                <img className="user-profilepicture" src={userData.profilePicture} alt={userData.name} />
                            </div>

                            <div className="user-details-container">
                                <div className="user-details-responsive">

                                    <h2 className="user-name">{userData.name}</h2>
                                    <div className="location-container">
                                        <h4>Location:</h4>
                                        <p>{userData.location}<i className="fa fa-map-marker"></i></p>
                                    </div>
                                    <div className="skills-container">
                                        <h4 className="skills-title">Skills:</h4>
                                        <div className="skills-list-container">
                                            {skillsString.split(',').map((skill, index) => (
                                                <p key={index} className="skills-profile">{skill.trim()}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="tokens-container">
                                        <p>TOKENS LEFT: </p>
                                        <p className="tokens-number">
                                            </p>
                                            <span className="material-symbols-outlined">
                                                stat_0 <p>{userData.tokens}</p>
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-details-container">

                            {/* show all posts you have created */}
                            {helpPostsArray.length > 0 ?
                                <div>
                                    <h3>My posts:</h3>
                                    <div className="cards-container">
                                        {
                                            helpPostsArray.map((eachPost, index) => {
                                                if (!eachPost.isCompleted) {
                                                    return (<PostCard key={index} post={eachPost} />)
                                                }
                                            })
                                        }
                                    </div>
                                </div> : <p>You have no posts yet</p>}
                            {/* show all post that you have been chosen as volunteer */}
                            {HelpPostIHaveBeenChosen.length > 0 ?
                                <div >
                                    <h3>I&aposve been chosen as volunteer:</h3>
                                    <div className="cards-container">
                                        {
                                            HelpPostIHaveBeenChosen.map((eachPost, index) => {
                                                if (!eachPost.isCompleted) {
                                                    return (<PostCard key={index} post={eachPost} />)
                                                }
                                            })
                                        }
                                    </div>
                                </div> : <p className="not-v-yet">You have not been selected as volunteer yet</p>}
                            {/* show all post you have volunteered to do */}
                            {HelpPostIVolunteered.length > 0 ?
                                <div>
                                    <h3>I have volunteered to:</h3>
                                    <div className="cards-container">
                                        {
                                            HelpPostIVolunteered.map((eachPost, index) => {
                                                if (!eachPost.isCompleted) {
                                                    return (<PostCard key={index} post={eachPost} />)
                                                }
                                            })
                                        }
                                    </div>
                                </div> : <p>You have no active volunteer offers</p>}
                        </div>
                    </div>
                </div>
                : <Loading />}
        </>
    )
}

export default MyProfile;