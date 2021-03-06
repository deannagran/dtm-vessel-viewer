import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "./ErrorNotice"
import { Link } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [companyName, setCompanyName] = useState();
  const [error, setError] = useState();
  let url = window.location.origin;

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, firstName, lastName, companyName };
      await Axios.post(url + "/users/register", newUser);
      
      const loginRes = await Axios.post(url + "/users/login", {
        email,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/confirmation");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
      <label htmlFor="register-first-name">First Name *</label> 
        <input
          id="register-first-name"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />

        
        <label htmlFor="register-last-name">Last Name *</label>
        <input
          id="register-last-name"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="register-company-name">Company Name</label>
        <input
          id="register-company-name"
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label htmlFor="register-email">Email *</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password *</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        
        <input type="submit" value="Register" />
        <label htmlFor="login-password">Already have an account? Click 
        <Link to="/login"> here </Link>
        to login.
        </label>
      </form>
    </div>
  );
}