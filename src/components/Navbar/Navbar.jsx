import "./Navbar.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  let newNotifications = false;
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState('')
  const { userId } = useParams()
  const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const handleSidebar = () => {
    const sideBar = document.querySelector(".navbar .sidebar");
    sideBar.classList.toggle("hidden");
    if (sideBar.style.right === "0px") {
      sideBar.style.right = "-400px"
    }
  };

  const gotoNotifications = () => {
	navigate('/notifications');
  }

  const hasTokens = async () => {
    console.log(userData.tokens)
    if (userData.tokens < 1) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const banner = document.querySelector(".no-tokens-banner")
        banner.classList.toggle("hidden");
        if (banner.style.top === "0px") {
          banner.style.top = "-300px"
        }
      } catch (error) {
        console.log("There was an error:", error)
      }
    }
  }

  // Hide the banner after 5 seconds
  const hideBanner = () => {
    const banner = document.querySelector(".no-tokens-banner");
    setTimeout(() => {
      banner.classList.add("hidden");
    }, 4000);
  };

  useEffect(() => {
    if (user) {
      fetch(`${BACKEND_ROOT}/user/${user._id}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setUserData(responseJson);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const addClassNewToNotifIcon = () => {
	const notificationsElement = document.querySelector("#notifications-icon");
	notificationsElement.classList.add("new");
  };

  	//check if there are new notifications
  	const checkNotificationsLoop = () => {
		if (user && !newNotifications) {
			fetch(`${BACKEND_ROOT}/user/check-notifications/${user._id}`)
				.then((response) => response.json())
				.then((responseJson) => {
					newNotifications = responseJson.hasNewNotifications
					if (newNotifications) {
						addClassNewToNotifIcon();
					}
					else {
						setTimeout(checkNotificationsLoop, 10000);
					}
			});
		}
		else if (newNotifications) {
			addClassNewToNotifIcon();
		}
	};
	checkNotificationsLoop();

  return (
    <div className="navbar-container">
      <div className="no-tokens-banner hidden">
        <p>Sorry, your are out of tokens</p>
      </div>
      <nav className="navbar">
        {isLoggedIn && (
          <>
            <Link to="/home">
              <img className="logo" src="/images/4H-logo-round-green2.svg" alt="" />
            </Link>
            <div className="nav-right">
			  <svg id="notifications-icon" className="" onClick={gotoNotifications} width="24" height="24" viewBox="0 0 24 24">
			  	<title>Notifications</title>
                <path d="M11.5,22C11.64,22 11.77,22 11.9,21.96C12.55,21.82 13.09,21.38 13.34,20.78C13.44,20.54 13.5,20.27 13.5,20H9.5A2,2 0 0,0 11.5,22M18,10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18L18,16M19.97,10H21.97C21.82,6.79 20.24,3.97 17.85,2.15L16.42,3.58C18.46,5 19.82,7.35 19.97,10M6.58,3.58L5.15,2.15C2.76,3.97 1.18,6.79 1,10H3C3.18,7.35 4.54,5 6.58,3.58Z"></path>
              </svg>
              <div className="tokens-state">
              <span className="material-symbols-outlined">
                stat_0
              </span>
              <p>{userData.tokens}</p>
              </div>
              <img className="right-button" onClick={handleSidebar} src={userData.profilePicture} alt="profile picture" />
            </div>
            <div className="sidebar hidden">
              <div onClick={handleSidebar} className="center">
                <div></div>
              </div>
              <div className="sidebar-content ">
                <ul className="side-list">
                  <li >
                    <Link to="/myprofile">
                      <p onClick={handleSidebar} className="side-element">Profile</p>
                    </Link>
                  </li>
                  <li >
                    <Link to="/editprofile">
                      <p onClick={handleSidebar} className="side-element">Edit profile</p>
                    </Link>
                  </li>
                  <li >
                    <Link to="/createhelp">
                      <p onClick={() => { handleSidebar(); hasTokens(); hideBanner(); }}
                        className="side-element">
                        Create Help request
                        {"  "} <i className="fa fa-plus" style={{ color: "#111111" }}></i>
                        {"  "} <i className="fa fa-plus" style={{ color: "#a8ec41" }}></i>
                      </p>
                    </Link>
                  </li>
                  <li >
                    <Link to="/alltestimonies">
                      <p onClick={handleSidebar} className="side-element">Testimonies</p>
                    </Link>
                  </li>
                  <li >
                    <Link to="/createtestimony">
                      <p onClick={handleSidebar} className="side-element">Create testimony {"   "}
                        {"  "} <i className="fa fa-plus" style={{ color: "#111111" }}></i>
                        <i className="fa fa-plus" style={{ color: "#a8ec41" }}></i>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <div className="sidebar-stroke">{''}</div>
                  </li>
                  <li >
                    <p onClick={logOutUser} className="side-element">Logout</p>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/">
              <img className="logo" src="/images/4H-logo-round-green2.svg" alt="" />
            </Link>
            <div className="nav-landing-left">
              <Link to="/signup">
                <p className="nav-b-left">Sign Up</p>
              </Link>
              <Link to="/login">
                <p className="nav-b-left">Login</p>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;