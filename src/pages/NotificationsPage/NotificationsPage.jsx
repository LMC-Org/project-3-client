import "./NotificationsPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;


function NotificationsPage() {
	const { user } = useContext(AuthContext);
	const [notificationsArray, setNotificationsArray] = useState([]);
	let text;
	let linkUrl;

	const setTextAndUrl = (category, reference) => {
		const TEXTCAT1 = "A person offers you help.";
		const TEXTCAT2 = "You were chosen to help.";
		const TEXTCAT3 = "You have earned 1 help token.";
		const UNKNOWNTEXT = "Unknown notification."
		let BASEURL = "/help-post";

		switch (category) {
			case 1:
				text = TEXTCAT1;
				linkUrl = `${BASEURL}/${reference}`;				
				break;
			case 2:
				text = TEXTCAT2;
				linkUrl = `${BASEURL}/${reference}`;				
				break;
			case 3:
				text = TEXTCAT3;
				linkUrl = "/myprofile";				
				break;		
			default:
				text = UNKNOWNTEXT;
				linkUrl = "/myprofile";
				break;
		}
	};

	const renderNotifications = (array) => {
		console.log("notificationsArray: ", array);

		if(array[0]) {
			return (
				<ul>
					{array.map((element, index) => {
						setTextAndUrl(element.category, element.reference);
						console.log("RenderNoficiations fn. Element, text, url:\n\t",index, element, text, linkUrl);

						return (
							<Link to={linkUrl} key={index}>
								<li>{text}</li>
							</Link>
						)
					})}
				</ul>
			);
		}
		else {
			return (<h2>You have no notifications.</h2>);
		}
	};

	//FETCH: get all notifications of the user. NEW AND OLD
	// in this fetch, Backend resets the hasNewNotifications flag.
	useEffect(() => {
		fetch(`${BACKEND_ROOT}/user/get-notifications/${user._id}`)
			.then((response) => response.json())
			.then((jsonData) => {
				console.log("fetch get-notifications, response: ", jsonData);
				setNotificationsArray(jsonData);})
			.catch( error => console.error(error));
	}, []);

	return (
		<>
			<h1>NOTIFICATIONS PAGE</h1>
			{notificationsArray[0] ?
				renderNotifications(notificationsArray)
				: <Loading />
			}
		</>

	)
}

export default NotificationsPage;