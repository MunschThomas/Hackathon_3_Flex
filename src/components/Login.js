import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div onClick={() => loginWithRedirect()}>
        <p className="buttonConnect">Se connecter</p>
      </div>
    </>
  );
};

export default LoginButton;
