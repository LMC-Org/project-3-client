import { Link } from "react-router-dom";

import "./HelpPostHome.css";

const HelpPostHome = (props) => {
	const { _id, title, location, description, creator } = props.post;

	return (
		<Link to={`/help-post/${_id}`} >
			<div className="help-post-home">
				<p className="title">{title}</p>
				<p className="description">{description}</p>
				<div className="image-location-container">
					<div className="creator-container">
						<img className="home-creator-picture" src={creator.profilePicture} alt="" />

						<p className="creator-name-small">{creator.name}</p>
					</div>
					<p className="location">{location} <i className="fa fa-map-marker"></i></p>
				</div>
			</div>
		</Link>
	);
};

export default HelpPostHome;