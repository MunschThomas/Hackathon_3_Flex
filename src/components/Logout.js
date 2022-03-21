// import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import React from "react";

const LogoutButton = (props) => {
  let navigate = useNavigate();
  console.log(props);
  // const { logout } = useAuth0();
  let disconnect = () => {
    props.setInput("");
    navigate("/");
  };

  return (
    <button className="logOut" onClick={() => disconnect()}>
      <h3>Déconnexion</h3>
    </button>
  );
};

export default LogoutButton;
