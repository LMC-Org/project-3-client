import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleSidebar = () => {
    const sideBar = document.querySelector(".navbar .sidebar");

    sideBar.classList.toggle("hidden");
    if (sideBar.style.right === "0px") {

      sideBar.style.right = "-400px"

    }
  }

  return (
    <div className="navbar-container">

      <nav className="navbar">


        {isLoggedIn && (
          <>
            <Link to="/home">
              <img className="logo" src="./images/4H logo round white2.svg" alt="" />
            </Link>

            <img className="right-button" onClick={handleSidebar} src="../public/images/profile-pic-default.svg" alt="" />
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}


            <div className="sidebar hidden">

              <div onClick={handleSidebar} className="center">
                <div></div>
              </div>

              <div className="sidebar-content ">
                <ul className="side-list">


                  <li className="side-element">
                    <Link to="/profile">
                      <button onClick={handleSidebar} className="side-element">Profile</button>
                      {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
                    </Link>
                  </li>
                  <li className="side-element">
                    <Link to="/createhelp">
                      <button>Create Help request</button>
                    </Link>
                  </li>


                  <li className="side-element">
                    <button>Testimonies</button>
                  </li>

                  <li className="side-element">
                    <button onClick={logOutUser}>Logout</button>
                  </li>

                </ul>
              </div>

            </div>
          </>
        )}

        {!isLoggedIn && (
          <>
            <div className="logo">
              <Link to="/">
                {" "} <button>Landing</button>{" "}
              </Link>
            </div>
            <Link to="/signup">
              {" "}
              <button>Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
