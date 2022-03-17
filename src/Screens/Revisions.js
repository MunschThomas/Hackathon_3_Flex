import React from "react";
import Logout from "../components/Logout";
import Logo from "../assets/logo_blue.png";

function Revisions(props) {
  return (
    <div className="imgContainerProfil">
      <img src={Logo} alt="logo Enedis"></img>
      <div className="logOut">
        <Logout />
      </div>
      <div className="infoContainer">
        <img src={props.user.picture} alt={props.user.name}></img>
        <p className="profilName">{props.user.name}</p>
      </div>
    </div>
  );
}

export default Revisions;
