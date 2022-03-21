//***ADD TO AUTH0 :***
// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import Logo from "../assets/logo_blue.png";
import { useEffect, useState } from "react";
import "./styles/Profil.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const Profile = (props) => {
  const [totalScore, setTotalScore] = useState();

  useEffect(() => {
    let users = localStorage.getItem(props.user);
    setTotalScore(users);
  }, []);

  return (
    <>
      <div className="holderContainer">
        <div className="imgContainerProfil">
          <img src={Logo} alt="logo Enedis"></img>
          <div className="logOut">
            <Logout input={props.user} setInput={props.setInput} />
          </div>
          <div className="infoContainer">
            {/* <img src={props.user.picture} alt={props.user.name}></img> */}
            <h3 className="profilName">Bienvenue {props.user}</h3>
          </div>
        </div>
        <div className="holderScoreContainer">
          {/* <h2>Votre score</h2> */}
          {totalScore === "8" ? (
            <h3>Felicitations ! Vous avez débloquer les 8 Fondamentaux</h3>
          ) : (
            <h3>
              Vous avez débloquez {totalScore ? totalScore : "0"} fondamentaux!
            </h3>
          )}
          <div className="scoreContainer">
            <FontAwesomeIcon
              icon={faTrophy}
              size={window.innerWidth > 600 ? "3x" : "2x"}
              color="var(--neutral-600)"
              className={totalScore >= 1 ? "winIcon" : ""}
            />
            <FontAwesomeIcon
              icon={faTrophy}
              size={window.innerWidth > 600 ? "3x" : "2x"}
              color="var(--neutral-600)"
              className={totalScore >= 2 ? "winIcon" : ""}
            />
            <FontAwesomeIcon
              icon={faTrophy}
              size={window.innerWidth > 600 ? "3x" : "2x"}
              color="var(--neutral-600)"
              className={totalScore >= 3 ? "winIcon" : ""}
            />
            <FontAwesomeIcon
              icon={faTrophy}
              size={window.innerWidth > 600 ? "3x" : "2x"}
              color="var(--neutral-600)"
              className={totalScore >= 4 ? "winIcon" : ""}
            />
            <FontAwesomeIcon
              icon={faTrophy}
              size={window.innerWidth > 600 ? "3x" : "2x"}
              color="var(--neutral-600)"
              className={totalScore >= 5 ? "winIcon" : ""}
            />
            <FontAwesomeIcon
              icon={faTrophy}
              size={window.innerWidth > 600 ? "3x" : "2x"}
              color="var(--neutral-600)"
              className={totalScore >= 6 ? "winIcon" : ""}
            />
            <FontAwesomeIcon
              icon={faTrophy}
              size={window.innerWidth > 600 ? "3x" : "2x"}
              color="var(--neutral-600)"
              className={totalScore >= 7 ? "winIcon" : ""}
            />
            <FontAwesomeIcon
              icon={faTrophy}
              size={window.innerWidth > 600 ? "3x" : "2x"}
              color="var(--neutral-600)"
              className={totalScore >= 8 ? "winIcon" : ""}
            />
            {/* <div className="circleBorder"></div> */}
          </div>

          {/* <div>Debloquez les 8 fondamenteux</div> */}
        </div>
        <div className="boutonContainer">
          <Link to="../game" onClick={() => props.setChooseGame(0)}>
            <div className="boutonPlay">
              <div className="playRoute"></div>

              <h3>Jouer</h3>

              <h3>en déplacement</h3>
              <p>
                Décors routier, évitez les obstacles, et récuperer les lettres
                ENEDIS afin d'accedez aux questions du quiz
              </p>
            </div>
          </Link>
          <Link to="/revisions">
            <div className="boutonPlay">
              <div className="playReviser"></div>
              <h3>Revisez</h3>
              <p>
                Accédez au quiz avec des questions aléatoires pour s'entrainer
              </p>
            </div>
          </Link>
          <Link to="/game" onClick={() => props.setChooseGame(1)}>
            <div className="boutonPlay">
              <div className="playBureau"></div>
              <h3>Jouer</h3>
              <h3>au bureau</h3>
              <p>
                Décors de bureau, évitez les obstacles, et récuperer les lettres
                ENEDIS afin d'accedez aux questions du quiz
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
