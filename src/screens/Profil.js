import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Components/Logout";
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
          <div className="circleBorder">{console.log(user)}</div>
          <div>Fondamentaux</div>
        </div>
        <div className="boutonContainer">
          <div className="bouton reviser">Reviser</div>
          <Link to="game">
            <div className="bouton play">Jouer</div>
          </Link>
          <Link to="game3">
            <div className="bouton play">Jouer TEST</div>
          </Link>
        </div>
        <div className="logOut">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Profile;
