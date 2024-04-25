import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name, phone };
    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="not-logged-main-cont">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
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

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} placeholder="Your name" />

        <label>Phone:</label>
        <input type="text" name="phone" value={phone} onChange={handlePhone} placeholder="+34 xxxxxxxxx"/>

        <button className="submitbutton" type="submit">Sign Up</button>
      </form>

      {errorMessage && <p >{errorMessage}</p>}

      <p className="error-message">Already have account?</p>
      <Link className="submitbutton" to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
