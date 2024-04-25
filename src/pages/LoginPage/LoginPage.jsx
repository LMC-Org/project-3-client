import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);



  const { storeToken, authenticateUser } = useContext(AuthContext);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <div className="LoginPage">
      <h1>Login</h1>
<div className="not-logged-main-cont">
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleEmail} placeholder="example@gmail.com" />
        
        <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="Enter your password"
          />
        
        <button className="submitbutton" type="submit">LOGIN</button>
      </form>

      {errorMessage && <p >{errorMessage}</p>}
      <p className="error-message">Don{"'"}t have an account yet?</p>
      <Link className="submitbutton" to={"/signup"}> SIGN UP</Link>
    </div>
    </div>
  );
}

export default LoginPage;
