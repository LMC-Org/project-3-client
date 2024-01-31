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
                <div id="main-image-container">
                    {/* <video autoPlay muted loop>
                        <source className="landing-video" src="./images/3d-hug-video.mp4" type="video/mp4"></source>
                    </video> */}
                    <img className="landing-main-image" src="/images/approaching-hands.jpg" alt="" />
                </div>
                <h2 className="first-title">HELP IS ALL AROUND</h2>
                <h3 className="landing-subtitle">Get the help you need in exhange for helping others</h3>
                <div id="landing-cta">
                </div>
            </section>
            <div className="middle-bottom">
                    <h3 className="first-3">First 3 help requests are on the house</h3>
                    <Link to="/signup">
                        <p className="get-help-button">Join now</p>
                    </Link>
            <section className="features-section">
                <p>Share the kind of help you need</p>
                <img className="landing-illustration" src="/images/illustrations/undraw_uploading_re_okvh.svg" alt="" />
                <p>Connect with caring people</p>
                <p>Sign in and get your first 3 tokens for free</p>
                <p>Earn more tokens by helping others</p>
            </section>
            <Link to="/about"><p className="about-landing">HOW IT WORKS</p></Link>
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
