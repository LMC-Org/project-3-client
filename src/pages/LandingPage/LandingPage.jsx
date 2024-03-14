import { Link } from "react-router-dom";
import Testimony from "../../components/Testimony/Testimony";
import "./LandingPage.css";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



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
        <>

            <div className="landing-wrapper">
                <section id="landing-upper">
                    <div id="main-image-container">
                        <img className="landing-main-image" src="/images/approaching-hands.jpg" alt="" />
                    </div>
                    <h2 className="first-title">HELP IS ALL AROUND</h2>
                    <h3 className="landing-subtitle">Get the help you need in exhange for helping others</h3>
                  
                </section>
                <div className="middle-bottom">
                    <h3 className="first-3">First 3 help requests are on the house</h3>
                    <Link to="/signup">
                        <p className="get-help-button">Join now</p>
                    </Link>
                    <section className="features-section">
                        <div className="humans-img-container">

                            <div className="landing-img-container">
                                <p id="img-title-landing">You are not alone</p>
                                <img className="landing-img" src="\images\elder-landing.jpg" alt="man-door-pleased-to-see-you" />
                            </div>
                            <div className="landing-img-container">
                                <p id="img-title-landing">Connect with caring people</p>
                                <img className="landing-img" src="\images\kitchen-landing.jpg" alt="kitchen-women-convo" />
                            </div>
                            <div className="landing-img-container">
                                <p id="img-title-landing">Where Needs Meet Deeds</p>
                                <img className="landing-img fitness" src="\images\fitness-landing.jpg" alt="kitchen-women-convo" />
                            </div>
                        </div>
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
                    <div className="phantom-footer"></div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
