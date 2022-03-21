import React from "react";
import Login from "../components/Login";
import "./styles/Home.css";
import background from "../assets/HomeBG.jpeg";
import Logo from "../assets/logo_white.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home({ input, setInput }) {
  let navigate = useNavigate();
  useEffect(() => {
    !input && navigate("/");
  }, []);
  return (
    <div className="Home" style={{ backgroundImage: `url(${background})` }}>
      <div className="imgContainerHome">
        <img src={Logo} alt="logo Enedis"></img>
      </div>
      <Login input={input} setInput={setInput} />
    </div>
  );
}
