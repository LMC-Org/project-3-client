import "./Testimony.css";

const Testimony = (props) => {
    const { text, rating, creator } = props;

    const setStars = (rating) => {
        let stars = "";
        for (let i = 0; i < rating; i++) {
            stars += "★";
        }
        for (let i = 0; i < 5 - rating; i++) {
            stars += "☆";
        }
        return (stars);
    }

    return (
        <article className="testimony">
            <div className="creator-rating">
                <div className="testimony-creator">
                    <img src={creator.profilePicture} alt={creator.name} />
                    <p>{creator.name}</p>
                </div>
                <p className="testimony-rating">{setStars(rating)}</p>
            </div>
            <p className="quote">{text}</p>
        </article>
    );
};

export default Testimony;