import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="logOut"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      <h3>Déconnexion</h3>
    </button>
  );
};

export default LogoutButton;
