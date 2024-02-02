import "./NotificationsPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

function NotificationsPage() {
	const { user } = useContext(AuthContext);
	const [notificationsArray, setNotificationsArray] = useState(["not-loaded"]);
	let text;
	let linkUrl;
	let isUnread;

	const setTextAndUrl = (category, reference, isUnread) => {
		const TEXTCAT1 = "A person offers you help.";
		const TEXTCAT2 = "You were chosen to help.";
		const TEXTCAT3 = "You have earned 1 help token.";
		const TEXT_UNKNOWN = "Unknown notification."
		const BASEURL = "/help-post";

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
				text = TEXT_UNKNOWN;
				linkUrl = "/myprofile";
				break;
		}
		if (isUnread) {
			isUnread = "unread";
		}
		else {
			isUnread = "";
		}
	};

	const renderNotifications = (array) => {
		console.log("notificationsArray: ", array);

		if(array[0]) {
			return (
				<div id="notifications-container">
					<ul>
						{array.map((element, index) => {
							setTextAndUrl(element.category, element.reference, element.isUnread);
							console.log("RenderNoficiations fn. Element, text, url:\n\t",index, element, text, linkUrl);

							return (
								<Link to={linkUrl} key={index}>
									<li className={isUnread} >{text}</li>
								</Link>
							)
						})}
					</ul>
				</div>
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
				setNotificationsArray(jsonData);
			})
			.catch( error => console.error(error));
	}, []);

	return (
		<>
			<h1>NOTIFICATIONS PAGE</h1>
			{notificationsArray[0] === "not-loaded" ?
				<Loading />
				: renderNotifications(notificationsArray)
			}
		</>

	)
}

export default NotificationsPage;