import React, { useContext, useState } from "react"
import { GrUpdate } from "react-icons/gr"
import { VscAdd } from "react-icons/vsc"
import { FaSearch } from "react-icons/fa"
import "../styles/SecondBanner.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { DocsContext } from "./DocsContext"
import Axios from "axios";
var url = document.location.origin;
const getUserData = async function () {
  var result = false;
  await Axios.post('http://3.14.129.203/userData').then((res)=>{result = res.data});
  return result;
}
function SecondBanner() {
  const [userData, setUserData] = useState({});
  const [activeProfile, setActiveProfile] = useState(false)
  const { setLogged } = useContext(DocsContext)
  const { search, setSearch } = useContext(DocsContext);
  getUserData().then((res)=>{
    setUserData(res);
  })
  const iconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="second-banner">
      <div className="search-bar">
        <input
          placeholder="Rechercher"
          type="text"
          value={search}
          name="search"
          id="searchbar"
          onChange={handleChange}
        />
        <FaSearch
          style={{
            position: "absolute",
            right: -7,
            fontSize: 29,
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
        />
      </div>
      <span className="advanced-search">Recherche avancée </span>

      <span className="add-btn" style={iconStyle}>
        <VscAdd fontSize={29} />
      </span>
      <span style={iconStyle}>
        <GrUpdate fontSize={29} />
      </span>
      <span onClick={() => setActiveProfile(true)} className="profile-picture">
        L
      </span>
      <div className={activeProfile ? "profile" : "no-profile"}>
        <button className="p-close-btn" onClick={() => setActiveProfile(false)}>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faX}
            fontSize={25}
            color={"#FF0000"}
          />
        </button>
        <div className="pp-wrapper">
          <span className="lg-pp profile-picture"></span>
          <span>{userData.username}</span>
          <button
            onClick={() => setLogged(false)}
            className="general-btn logout-btn"
          >
            Se deconnecter
          </button>
        </div>

        <span className="p-title">Paramètre</span>
        <span>Email:{userData.email}</span>
        <span>Mot de passe: ********</span>
        <span className="p-title">A propos</span>
        <span>Version produit: 1.0.1</span>
      </div>
    </div>
  )
}

export default SecondBanner
