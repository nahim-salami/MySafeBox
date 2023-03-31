import React, { useContext, useState } from "react";
import "../styles/Connexion.css";
import logo from "../assets/LOGO2 2.png";
import { DocsContext } from "../components/DocsContext";
import Axios from "axios";
const {v4 : uuidv4} = require('uuid');
function Connexion() {
  const { setLogged } = useContext(DocsContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/signin", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message == 'valid') {
        setLogged(true);
      }
      else {
        alert("Identifiant ou mot de passe incorrect")
      }
    })
    //  redirect('/Accueil')
  };

  return (
    <div className="Connexion">
      <div className="wrapper">
        <div className="logo-part">
          <img src={logo} className="signin-logo" alt="Logo" />
        </div>
        <div className="form-wrapper">
          <form method="POST" onSubmit={handleSubmit}>
            <p>CONNEXION</p>

            <label htmlFor="email">
              <input
                type={"email"}
                required
                autoComplete="off"
                placeholder="Email"
                name="mail"
                id="email"
                onChange={(e) => { setUsername(e.target.value) }}
              />
            </label>

            <label htmlFor="password">
              <input
                type="password"
                placeholder="Mot de passe"
                required
                name="password"
                id="password"
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </label>

            <span>Mot de passe oublié?</span>

            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
