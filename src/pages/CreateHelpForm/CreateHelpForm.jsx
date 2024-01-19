import "./CreateHelpForm.css";
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../../context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";
import service from "../../services/file-upload.service";


function CreateHelpForm() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [userData, setUserData] = useState('')

    const [helpPosts, setHelpPosts] = useState([])
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [helpImageUrl, setHelpImageUrl] = useState('')
    const [creator, setCreator] = useState('')
    const [volunteers, setVolunteers] = useState('')
    const [isCompleted, setIsCompleted] = useState('')
    const [tokens, setTokens] = useState(userData.tokens);
    const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

    const navigate = useNavigate();
    console.log(userData)

    const handleFileUpload = (e) => {
        console.log("The file to be uploaded is: ", e.target.files);

        const uploadData = new FormData();

        uploadData.append('helpImageUrl', e.target.files[0]);

        console.log("UploadData", uploadData);
        service
            .uploadImage(uploadData)
            .then(response => {
                console.log("response is: ", response);
                // response carries "fileUrl" which we can use to update the state
                setHelpImageUrl(response.fileUrl);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };

    useEffect(() => {
        if (user) {
            fetch(`${BACKEND_ROOT}/user/${user._id}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    setTokens(responseJson.tokens);
                    setUserData(responseJson);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const postHelp = async (event) => {
        event.preventDefault();
        let imageUrl = "/images/help-default.jpg";
        if (helpImageUrl) {
            imageUrl = helpImageUrl;
        }
        const helpPosts = {
            title,
            location,
            description,
            helpImageUrl,
            creator: user._id,
            volunteers,
            isCompleted
        };

        try {
            const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${BACKEND_ROOT}/help-post/createhelp`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(helpPosts),
            });
            const newHelpPost = await response.json();
            setHelpPosts((previousHelpPosts) => [newHelpPost, ...previousHelpPosts]);
            navigate("/myprofile");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Create Help Request</h1>
            <div >
                <form className="create-help-container">
                    <label htmlFor="title">Title</label>
                    <input disabled={tokens <= 0} placeholder="Name your help request" value={title} onChange={(event) => setTitle(event.target.value)} type="text" name="title" id="title" />

                    <label htmlFor="location">Location</label>
                    <textarea disabled={tokens <= 0} value={location} onChange={(event) => setLocation(event.target.value)} type="text" name="location" id="location" />

                    <label htmlFor="description">Description</label>
                    <textarea disabled={tokens <= 0} value={description} onChange={(event) => setDescription(event.target.value)} type="text" name="description" id="description" />

                    <label htmlFor="helpImageUrl">Help Image</label>
                    <input disabled={tokens <= 0} type="file" accept="image/*" className="image-input"

                        onChange={(event) => handleFileUpload(event)}
                        name="helpImageUrl"
                        id="helpImageUrl" />
                    {helpImageUrl && <img className="img-preview" src={helpImageUrl} alt="Help Image" />}

                    <p onClick={(event) => postHelp(event)} disabled={tokens <= 0} className="create-help-button">CREATE</p>
                </form>
            </div>
        </div>
    );
}

export default CreateHelpForm;