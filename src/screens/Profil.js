import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Logout from "../components/Logout";
import Logo from "../assets/logo_blue.png";
import "./styles/Profil.css";

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return;
  }

  return (
    <>
      <div className="holderContainer">
        <div className="imgContainer">
          <img src={Logo} alt="logo Enedis"></img>
        </div>
        {/* <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
      <p>{user.email}</p> */}
        <p className="profilName">{user.name}</p>
        <div className="scoreContainer">
          <div className="circleBorder">0</div>
          <div>Fondamentaux</div>
        </div>
        <div className="boutonContainer">
          <div className="boutonPlay">Reviser</div>
          <div className="boutonPlay">Jouer</div>
        </div>
        <div className="logOut">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Profile;
