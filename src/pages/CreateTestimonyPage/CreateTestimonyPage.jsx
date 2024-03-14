import "./CreateTestimonyPage.css";
import { useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";


function CreateTestimonyPage() {
    const navigate = useNavigate();
    const [testimonies, setTestimonies] = useState([]);
    const [text, setText] = useState('')
    const [rating, setRating] = useState(0)
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const userId = user._id;
    const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

    const handleRating = (rate) => {
        setRating(rate);
    }
    const postData = async (event) => {
        event.preventDefault();
        const testimonies = {
            text,
            rating,
            creator: userId,
        };
        try {
            const response = await fetch(`${BACKEND_ROOT}/testimonies/createtestimony`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testimonies),
            });
            const newTestimony = await response.json();
            setTestimonies((previousTestimony) => [newTestimony, ...previousTestimony]);
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
        {user ? 
        <div className="form-page">
            <h1 className="testimony-page-title" >Create Testimony</h1>
            <form onSubmit={(event) => postData(event)}>
                <label className="testimony-box-label" htmlFor="text">Feel free to share your experience</label>
                <textarea placeholder="Your text here" value={text} onChange={(event) => setText(event.target.value)} name="text" id="text" rows="5"></textarea>
                <Rating onClick={handleRating} />
                <button className="submitbutton" type="submit">Send</button>
            </form>
        </div>
        : <Loading/>}
        </>
    );
}
export default CreateTestimonyPage;