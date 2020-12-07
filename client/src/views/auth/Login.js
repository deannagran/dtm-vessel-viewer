import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "./ErrorNotice"


export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  let url = window.location.origin;
  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        url + "/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/dashboard");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (

	<div id ="root">
	<center><div className="limiter">
		
			<div className="wrap-login100">
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
				<form className="login100-form validate-form p-l-55 p-r-55 p-t-140" onSubmit={submit}>
					<span className="login100-form-title">
						Login
					</span>

					<div className="wrap-input100 validate-input m-b-16" data-validate="Please enter Email Address">
						<input className="input100" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Please enter password">
						<input className="input100" type="password" name="pass" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>

					<div className="text-right p-t-13 p-b-23">
						<span className="txt1">
							Forgot 
						</span>

						<a href="#" className="txt2">
							Email / Password?
						</a>
					</div>

					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={submit}>
							Login
						</button>
					</div>

					<div className="flex-col-c p-t-90 p-b-30">
						<span className="txt1 p-b-9">
							Don’t have an account?
						</span>

						<a href="/register" className="txt3">
							Register
						</a>
					</div>
				</form>
			</div>
		
	</div>
  </center>
  </div>
  );
}
