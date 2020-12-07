import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

export default function Home(props) {
    const history = useHistory();
    const dashboard = () => history.push("/dashboard");

  return (<div className="page"><h1>Thank you.</h1>
  <h3>Your contact form has been sent succsessfully!<br></br></h3>
<button onClick={dashboard} class="continue-button ">Continue to Dashboard </button>
  
  </div>);
}