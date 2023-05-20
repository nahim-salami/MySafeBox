import React, { useContext, useState } from 'react'
import { GrUpdate } from 'react-icons/gr'
import { VscAdd } from 'react-icons/vsc'
import { FaSearch } from 'react-icons/fa'
import '../styles/SecondBanner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { DocsContext } from './DocsContext'
import "../styles/Connexion.css";
import Modal from './Modal'
import mailIcon from '../assets/Vectormail.png'
import pwdIcon from '../assets/Vectorpwd.png'
import DatePicker from 'react-date-picker'
import { getCookie, setCookie, apiUrl, apiBaseUrl } from "../components/utils";

function SecondBanner() {
  const [activeProfile, setActiveProfile] = useState(false)
  const { setLogged } = useContext(DocsContext)
  const { search, setSearch } = useContext(DocsContext)
  const [advanvedSearch, setAdvanvedSearch] = useState(false)
  const [changeProfil, setchangeProfil]=useState(false)
  const activeUserData = JSON.parse(getCookie("msfb-user-data"));
  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
            position: 'absolute',
            right: -7,
            fontSize: 29,
            top: 0,
            bottom: 0,
            margin: 'auto',
          }}
        />
        <Modal basic open={advanvedSearch} setOpen={setAdvanvedSearch}>
          <div
            style={{
              background: '#D0D0D0',
              width: '60%',
              marginTop: '6vh',
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
            }}
          >
            Filter par:{' '}
            <div style={{ flexGrow: 1 }}>
              <input
                type={'date'}
                style={{ marginRight: 20, marginLeft: 20, height: 23, width: 130 }}
              />
              <input
                style={{ marginRight: 20, height: 23, width: 130 }}
                type="text"
                placeholder="Libellé"
              />
              <select defaultValue={"none"} style={{ marginRight: 20, height: 29, width: 130, background: 'white', border: '0.5px solid #aaa'}}>
                <option value={"none"}>Type</option>
                <option value="folder">Dossier</option>
                <option value="file">Fichier</option>
              </select>
            </div>
            <button
              className="general-btn"
              style={{
                borderRadius: 0,
                paddingLeft: 40,
                fontStyle: 'italic',
                paddingRight: 40,
              }}
            >
              {' '}
              Rechercher
            </button>
          </div>
        </Modal>
      </div>
      <span className="advanced-search" onClick={() => setAdvanvedSearch(true)}>
        Recherche avancée{' '}
      </span>

      <span className="add-btn" style={iconStyle}>
        <VscAdd fontSize={29} />
      </span>
      <span style={iconStyle}>
        <GrUpdate fontSize={29} />
      </span>
      <span onClick={() => setActiveProfile(true)} className="profile-picture">
        L
      </span>
      <div className={activeProfile ? 'profile' : 'no-profile'}>
        <button className="p-close-btn" onClick={() => setActiveProfile(false)}>
          <FontAwesomeIcon
            style={{ cursor: 'pointer' }}
            icon={faX}
            fontSize={25}
            color={'#FF0000'}
          />
        </button>
        <div className="pp-wrapper">
          <span className="lg-pp profile-picture"></span>
          <span>{activeUserData.data.username}</span>
          <button
            onClick={() => setLogged(false)}
            className="general-btn logout-btn"
          >
            Se deconnecter
          </button>
        </div>

        <span className="p-title">Paramètre</span>
        <span>Email: {activeUserData.data.mail}</span>
        <span>Mot de passe: ..........</span>
        
        
        <Modal basic open={changeProfil} setOpen={setchangeProfil}>
        <div className="Connex">
        <div className="wrapper">
        <div>
          <div className="form-wrapper">
          <form method="POST" >
        <label htmlFor="email">
            <img src={mailIcon} alt=""/>
              <input
                className='input'
                type={"email"}
                required
                autoComplete="off"
                placeholder=" mail"
                name="mail"
                id="email"
              />  
            </label>    <br />


            <label htmlFor="password" >
            <img src={pwdIcon} alt=""/>
              <input
              className='input'
                type="password"
                placeholder="password"
                required
                name="password"
                id="password"
              />
            </label>  <br/>

            <button type="submit">Modifier</button>
              </form>
        </div>
        </div>

        </div>
        </div>
            
        </Modal>

        <button className="general-btn logout-btn" onClick={() => setchangeProfil(true)}>
            Modifier
          </button>
        
        
        
        
        <span className="p-title">A propos</span>
        <span>Version produit: 1.0.1</span>
      </div>
    </div>
  )
}

export default SecondBanner
