import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Profil from "./screens/Profil";
import Loading from "./assets/loading.gif";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="loadingContainer">
        <img src={Loading} alt="loading" className="loading"></img>
      </div>
    );
  }
  return isAuthenticated ? (
    <div className="App">
      <Profil />
      <Routes>{/* <Route path="/" element={<Home />}></Route> */}</Routes>
    </div>
  ) : (
    <Home />
  );
}

export default App;
