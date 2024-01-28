import "./NotificationsPage.css";
import { useEffect, useState } from "react";

const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

const notificationItem = () => {

	return (
		<></>

	);

};

function NotificationsPage() {
	const [notificationsArray, setNotificationsArray] = useState();

	useEffect(() => {
		//FETCH get all notifications of the user. NEW AND OLD

	}, []);

	return (
		<h1>NOTIFICATIONS PAGE</h1>

	)
}

export default NotificationsPage;