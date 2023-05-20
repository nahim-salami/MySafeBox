import React, { useContext } from "react"
import "../styles/Banner.css"
import { useLocation } from "react-router-dom"
import logo from "../assets/LOGO2 1.png"
import { useState, useLayoutEffect, useEffect } from "react"
import { SlArrowRight, SlArrowDown } from "react-icons/sl"
import { Link } from "react-router-dom"
import { DocsContext } from "./DocsContext"

function Banner() {
  const [active, setActive] = useState("Accueil")
  const { logged } = useContext(DocsContext)

  let location = useLocation()

  useEffect(() => {
    setActive(location.pathname === '/' ? "Accueil" : location.pathname.slice(1))
  }, [location])


  const sections = [
    "Accueil",
    "Mes documents",
    "Mes dossiers",
    "Mes dossiers partagés",
  ]
  const sections2 = [
    "Gestion des documents",
    "Gestion des utilisateurs",
    "Gestion des groupes",
  ]

  useLayoutEffect(() => {
    const sections = document.querySelectorAll(".section")
    sections.forEach((section) => {
      if (section.innerText.split(' ').join('').replace('é', 'e') === active) {
        section.style.borderLeft = "5px solid #080669"
        section.style.boxShadow = "0 0 2px #bbb"
        section.style.backgroundColor = "rgba(15, 85, 137, 0.45)"
      } else {
        section.style.border = 0
        section.style.boxShadow = "none"
        section.style.backgroundColor = "transparent"
      }
    })
  }, [active])

  // const handleClick = (e) => {
  //   setActive(e.target.innerText)
  // }

  const [visible, setVisible] = useState(false)

  return (
    <div className="Banner" style={{ display: logged ? "block" : "none" }}>
      <div className="Banner-fixed">
        <img src={logo} alt="logo" />

        <div className="menu">
          {sections.map((section) =>
            section === "Accueil" ? (
              <Link key={section} to={`/`} className="section">
                <span
                  // onClick={handleClick}
                  style={{ height: "100%", display: "inline-block" }}
                >
                  {section}
                </span>
              </Link>
            ) : (
              <Link
                key={section}
                to={`/${section.replace(/\s/g, "").replace("é", "e")}`}
                className="section"
              >
                <span
                  // onClick={handleClick}
                  style={{ height: "100%", display: "inline-block" }}
                >
                  {section}
                </span>
              </Link>
            )
          )}
          <span
            style={{ cursor: "pointer", paddingLeft: "3vw" }}
            onClick={() => setVisible(!visible)}
          >
            Administration &nbsp;{" "}
            {visible ? (
              <SlArrowDown fontSize={17} fontWeight="bold" />
            ) : (
              <SlArrowRight fontWeight="bold" fontSize={17} />
            )}{" "}
          </span>
          {sections2.map((section) => (
            <Link
              key={section}
              to={`/${section.replace(/\s/g, "")}`}
              className="section"
            >
              <span
                // onClick={handleClick}
                style={{
                  display: visible ? "inline-block" : "none",
                  height: "100%",
                }}
              >
                {section}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Banner
