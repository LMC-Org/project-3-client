import { Link } from "react-router-dom";
import Testimony from "../../components/Testimony/Testimony";
import "./LandingPage.css";
import { useContext, useEffect, useState } from "react";


const LandingPage = () => {
    const [testimoniesArray, setTestimoniesArray] = useState([]);

    useEffect(() => {
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
        fetch(`${BACKEND_ROOT}/testimonies/landing`, { mode: 'cors' })
            .then((response) => response.json())
            .then((responseJson) => {
                setTestimoniesArray(responseJson);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="landing-wrapper">
            <section id="landing-upper">
                <div id="video-container">
                    {/* <video autoPlay muted loop>
                        <source className="landing-video" src="./images/3d-hug-video.mp4" type="video/mp4"></source>
                    </video> */}
                    <img src="" alt="" />
                </div>
                <h2 className="first-title">Do you need help with anything? </h2>
                <div id="landing-cta">
                    <h3>First 3 help requests are on the house</h3>
                    <Link to="/signup">
                        <p className="get-help-button">Get my free helps!</p>
                    </Link>
                </div>
            </section>
            <div className="middle-bottom">
            <section className="features-section">
                <p>Share what you need one token at a time</p>
                <p>Sign in and get your first 3 tokens for free</p>
                <p>Earn more tokens by helping others</p>
            </section>
            <p className="about-landing"><Link to="/about">HOW IT WORKS</Link></p>
            {/* In backend I need to populate creator and send it populated to frontend */}
            <div className="testimonies-container-landing">
                <section id="landing-testimonies">
                    {
                        testimoniesArray.map((eachTestimony, index) => {
                            const { text, rating, creator } = eachTestimony;
                            return (
                                <Testimony key={index} text={text} rating={rating} creator={creator} />
                            )
                        })
                    }
                </section>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
