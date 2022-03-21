// ***ADD TO AUTH0 :***
// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = ({ input, setInput }) => {
  let navigate = useNavigate();
  // ***ADD TO AUTH0 :***
  // const { loginWithRedirect } = useAuth0();

  let addPseudo = () => {
    let OldPseudo = localStorage.getItem(input);
    if (!OldPseudo && input !== "") {
      localStorage.setItem(input, 0);
      navigate("/Profil");
    } else if (input.length <= 1) {
      document.getElementById("buttonPseudo").style.borderColor = "#e10028";
    } else {
      navigate("/Profil");
    }
  };

  return (
    <>
      {/* ***ADD TO AUTH0 :*** */}
      {/* <div onClick={() => loginWithRedirect()}> */}
      <div>
        <input
          id="buttonPseudo"
          type="text"
          minLength="2"
          maxLength="10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pseudo"
        ></input>
        <p onClick={() => addPseudo()} id="buttonConnect">
          Se connecter
        </p>
      </div>
    </>
  );
};

export default LoginButton;
