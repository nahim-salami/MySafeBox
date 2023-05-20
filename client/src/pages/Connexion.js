import React, { useContext, useState } from "react";
import { getCookie, setCookie, apiUrl, apiBaseUrl } from "../components/utils";
import Axios from "axios";
import "../styles/Connexion.css";
import logo from "../assets/LOGO2 2.png";
import { DocsContext } from "../components/DocsContext";
import mailIcon from '../assets/Vectormail.png'
import pwdIcon from '../assets/Vectorpwd.png'

function Connexion() {
  const { setLogged } = useContext(DocsContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const isLog = Boolean(getCookie("msfb-logged"));

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(apiUrl.login, {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response)
      if(response.data.message =="valid") {
        setCookie("msfb-user-data", JSON.stringify(response.data));
        setLogged(true);
      }
      else {
        alert(response.data.message)
      }
    })
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
            <img src={mailIcon} alt=""/>
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

            <label htmlFor="password" >
            <img src={pwdIcon} alt=""/>
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
