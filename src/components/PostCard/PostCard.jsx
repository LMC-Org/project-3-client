import { Link } from "react-router-dom";
import "./PostCard.css";

const PostCard = (props) => {
	const {_id, title, location, description} = props.post;

	return (
		<Link to={`/help-post/${_id}`}>
			<div className="help-post-card-small" >
				<p className="title">{title}</p>
				<p className="location">{location} <i className="fa fa-map-marker"></i></p>
			</div>
		</Link>
	);
};

export default PostCard;