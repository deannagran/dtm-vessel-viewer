import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "./ErrorNotice"

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
    <div>
	    <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="login-email">First Name</label>
          <input
            id="login-email"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="login-email">Last Name</label>
          <input
            id="login-email"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="login-email">Company Name</label>
          <input
            id="login-email"
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="login-password">Verify Password</label>
          <input
            id="login-password"
            type="password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <input type="submit" value="Register" />
          
        </form>
		</div>
  );
}