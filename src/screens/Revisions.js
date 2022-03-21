import React from "react";
import Logout from "../components/Logout";
import Logo from "../assets/logo_blue.png";
import dataQuestions from "../assets/fondamentaux.json";
import CardQuestion from "../components/CardQuestion";

import "./styles/Revisions.css";
// import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Revisions(props) {
  const navigate = useNavigate();

  // const { user } = useAuth0();
  const [dataQuestion, setDataQuestion] = useState(dataQuestions);
  const [isAsked, setIsAsked] = useState([]);
  const [clk, setClk] = useState(false);
  const [isVisible, setisVisible] = useState(false);

  const newAdvice = () => {
    setClk(!clk);
    setisVisible(false);
  };

  useEffect(() => {
    const quest = Math.floor(Math.random() * dataQuestion.length);

    console.log("dataQuestion", dataQuestion, "quest", quest);
    const chosenQuest = dataQuestion.filter((dataQuestion, i) => i === quest);

    const newTab = dataQuestion.filter((el) => el.id !== chosenQuest[0].id);
    console.log("newTab", newTab);
    setDataQuestion(newTab);
    setIsAsked(...chosenQuest);
  }, [clk]);

  return (
    <>
      <div className="holderContainerCard">
        <div className="imgContainerProfil">
          <Link to="../Profil">
            <img src={Logo} alt="logo Enedis"></img>
          </Link>
          <div className="logOut">
            <Logout />
          </div>
          <div
            className="infoContainer"
            onClick={() => navigate("../Profil")}
          ></div>
        </div>
      </div>

      <div className="questionContainer">
        {dataQuestion && (
          <CardQuestion
            id={isAsked.id}
            question={isAsked.question}
            image={isAsked.image}
            reponse={isAsked.reponse}
            correction={isAsked.correction}
            isVisible={isVisible}
            setisVisible={setisVisible}
          />
        )}
        <div>
          <Link to="../Profil">
            <button className="buttonNextQ">Quitter</button>
          </Link>
          <button className="buttonNextQ" onClick={() => newAdvice()}>
            Question suivante
          </button>
        </div>
      </div>
    </>
  );
}

export default Revisions;
