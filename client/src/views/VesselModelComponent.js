import React, { useContext, Component } from "react";

//Reference : https://stackoverflow.com/questions/60346201/how-to-embed-external-js-script-file-into-react-component
import UserContext from "../context/UserContext";


const  VesselModelComponent = (props) => {
  const { userData} = useContext(UserContext);
    return (

        <div dangerouslySetInnerHTML={{ __html: '<iframe name="vesselfinder" id="vesselfinder" '
          + ' width="' + "100%" + '"'
          + ' height="' + "300" + '"'
          + ' frameborder="0"'
          + ' src=' +(''+userData.currVessel.modelLink)

          + '">Browser does not support embedded objects.<br/>Visit directly <a href="https://www.vesselfinder.com" target="_blank">www.vesselfinder.com</a>'
          + '</iframe>'}}>
            </div>

    );
}
export default VesselModelComponent;

