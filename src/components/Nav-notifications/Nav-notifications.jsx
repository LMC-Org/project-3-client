


//check if there are new notifications
const getNotifications = () => {
	if (user) {
		fetch(`${BACKEND_ROOT}/user/${user._id}`)
			.then((response) => response.json())
			.then((responseJson) => )
	}

  };