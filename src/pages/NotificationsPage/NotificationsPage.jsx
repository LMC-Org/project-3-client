import "./NotificationsPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const 		BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

function NotificationsPage() {
	const	{ user } = useContext(AuthContext);
	const	navigate = useNavigate();
	const	[notificationsArray, setNotificationsArray] = useState(["not-loaded"]);
	let		text;
	let		linkUrl;
	let		unreadClass;
	const	valuesArray = [];

	const putValues = () => {
		valuesArray.push({
			linkUrl: linkUrl
		});
	};

	const setTextAndUrl = (category, reference, helpTitle, ownerName, isUnread) => {
		const	TEXTCAT1 = "offers you help with";
		const	TEXTCAT2 = "You were chosen to help with";
		const	TEXTCAT3 = "You have earned 1 help token for helping with";
		const	TEXT_UNKNOWN = "Unknown notification."
		let		BASEURL = "/help-post";

		switch (category) {
			case 1:
				text = `${ownerName} ${TEXTCAT1} ${helpTitle}`;
				linkUrl = `${BASEURL}/${reference}`;				
				break;
			case 2:
				text = `${TEXTCAT2} ${helpTitle}`;
				linkUrl = `${BASEURL}/${reference}`;				
				break;
			case 3:
				text = `${TEXTCAT3} ${helpTitle}`;
				linkUrl = "/myprofile";				
				break;		
			default:
				text = TEXT_UNKNOWN;
				linkUrl = "/myprofile";
				break;
		}
		unreadClass = isUnread ? "unread" : " ";
		putValues();
	};

	const notifClickHandle = (userId, notifIndex, url) => {
		const	requestBody = JSON.stringify({ userId, notifIndex });
		// console.log("notifclickhandle userId and nnotifIndex ", requestBody);
		console.log("fetch: ");
		fetch(`${BACKEND_ROOT}/user/notification-set-as-read`,
		{
			method: "PATCH",
			mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
			body: requestBody
		})
		.then((res) => {
			//console.log("notifclickHandle response: ", res);
			console.log("clicked URL: ", url);
			return navigate(url);
		})
		.catch(err => console.error("notifClickHandle error: ", err));
		
	};

	const renderNotifications = (array) => {
		console.log("notificationsArray: ", array);

		if(array[0]) {
			return (
				<div id="notifications-container">
					<ul>
						{array.map((element, index) => {
							setTextAndUrl(element.category, element.reference._id, element.reference.title, element.reference.creator.name, element.isUnread );
							console.log("RenderNoficiations fn. Element, text, url:\n\t",index, element, text, linkUrl);

							return (
								<li className={`message-block ${unreadClass}`} key={index} onClick={() => {

									console.log("onclick attributes: ", user._id, index, valuesArray[index].linkUrl);																		
									notifClickHandle(user._id, index, valuesArray[index].linkUrl);
								}}>{text}</li>
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
			<h1>MY NOTIFICATIONS</h1>
			{notificationsArray[0] === "not-loaded" ?
				<Loading />
				: renderNotifications(notificationsArray)
			}
		</>

	)
}

export default NotificationsPage;