import { Link, useNavigate, useParams } from "react-router-dom";
import "./AboutPage.css"


function About() {

    return (
        <>
        <div className="head-container">
            <section className="about-head">
                <p className="title-about">HOW IT WORKS</p>
                <p className="subtitle">Bridging skills, <span className="subtitle-highlight"> Building connections</span></p>
                <br />
            </section>
            </div>
            <div className="about-main-container">
                <p className="intro">
                    With <Link to="/">4HANDS</Link>  you can connect with caring people whose skills or tangible advantages suit your needs.</p>
                <img className="about-illustration" src="/images/illustrations/undraw_high_five_re_jy71.svg" alt="fair-trade-img" />
                <p className="intro"><br /> There is no payment, <br /> we use tokens to keep a fair help exhange. <br />  </p>

                <ul className="main-steps-container">
                    <li><span className="material-symbols-outlined token-icon">
                        stat_0 </span></li>
                    <div className="steps-text">
                        <li> New users get 3 free tokens.</li>
                        <li>Tokens are redeemed to create and post help requests.</li>
                        <li>Once you are out of tokens you won't be able to create posts.</li>
                    </div> <br />
                    <img className="minus-token" src="/images/about-tokens-2v2.png" alt="" />

                    <li><span className="material-symbols-outlined token-icon">
                        stat_0 </span></li>
                    <li>You can earn more tokens by helping others.</li>
                    <li>For each help request from other users that you complete, you earn one token.
                    </li>
                    <img className="completed-token-img" src="images/about-tokens-1v2.png" alt="completed-help-+1token" />
                    <li><span className="material-symbols-outlined token-icon">
                        stat_0 </span></li>

                </ul>
                <div className="policy-about">
                    <p>As this is a community based site, there is also a
                        <Link to="/alltestimonies"> Testimonial Page </Link>
                        where users share their experience.</p>
                    <br />
                    <img className="about-illustration" src="/images/illustrations/undraw_happy_women_day_fbjt.svg" alt="happyusers-img" />
                    <p>If you would like to share yours, you can go to the
                        <Link to="/createtestimony" > Create Testimony </Link>
                        page and submit it there, we'll really appreciate it.</p>
                    <p>(You will have to be logged in)</p>
                    <span className="material-symbols-outlined privacy-icon">
                        verified_user
                    </span>
                    <p>We value honesty and privacy, so feel free to share as much as you like, but beware of sensitive information.</p>
                </div>

                <div className="about-thankyou">
                    <p className="thankyou-line">Thank you for taking the time :)</p>
                    <p className="hope-about">We hope you find your the help you need. <br />
                        The bigger the community the faster it will be!</p>
                </div>
            </div >

        </>
    )


}

export default About;