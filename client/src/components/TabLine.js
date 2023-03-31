import React, { useContext } from "react"
import "../styles/TabLine.css"
import file from "../assets/Vectorfile.png"
import del from "../assets/Vectordelete.png"
import download from "../assets/Vectordownload.png"
import folder from "../assets/Vectorfolder.png"
import shared from "../assets/VectorShare.png"
import { IoPricetagOutline } from "react-icons/io5"
import { DocsContext } from "./DocsContext"
import Axios from "axios";

function TabLine({
  type,
  nom,
  createDate,
  fileType,
  gestion = false,
  affect = false,
  add = false,
  id,
  background,
  path,
  categorie,
  component_id,
  folder_id
}) {
  if(typeof component_id === "undefined" && typeof folder_id !== "undefined") component_id = folder_id
  var date = new Date(createDate);
  createDate = date.getFullYear().toString() + '/' + date.getMonth().toString() + '/' + date.getDay().toString();
  if(typeof type !== "undefined" && type != null)
    type = type.split("/")[type.split("/").length - 1];
  else type = "folder"
  const { setActiveDocs } = useContext(DocsContext)
  const handleDelete = (e) => {
    var _id = e.target.getAttribute("data-id");
    var cpath = e.target.getAttribute("data-path");
    var queryUrl = "http://localhost:3001/removeComponent";
    if(type == 'folder') queryUrl = "http://localhost:3001/removeFolder";
    Axios.post(queryUrl, {
      component_id: _id,
      path: cpath,
    }).then((response) => {
      if (response.data.success) {
        alert(response.data.message)
        setActiveDocs((prev) => prev.filter((doc) => doc.component_id != _id))
      }
      else {
        alert(response.data.message);
      }
    })
  }
  const { checkeds, setCheckeds } = useContext(DocsContext)

  const icon = {
    folder,
    file,
    shared,
  }

  const types = {
    contrat: { color: "#9B0D0D", text: "Contrats" },
    bulletin: { color: "#2A6C60", text: "Bulletin de paie" },
    facture: { color: "#871FD9", text: "Factures" },
    none: { color: "transparent", text: "" },
  }

  const { color, text } = types[fileType ? fileType : "none"]

  const handleChange = (e) => {
    setCheckeds((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((elem) => elem !== id)
    )
  }

  return (
    <div className="TabLine-wrapper" style={{background: background ? 'rgba(51, 153, 228, 0.31)' : "rgba(220, 218, 218, 0.26)"}}>
      <div className="TabLine">
        <input
          type="checkbox"
          onChange={handleChange}
          className="Tab-checkbox"
          checked={checkeds.includes(id)}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={icon[type]}
            style={{ visibility: type ? "visible" : "hidden" }}
            className="Tab-icon"
            alt="file"
          />
          <div className={"file-infos"}>
            <span className="tab-title">{nom} </span>
            {fileType && (
              <span
                style={{
                  textAlign: "left",
                  color,
                }}
              >
                <IoPricetagOutline />{" "}
                <span style={{ fontSize: 15 }}>{text}</span>
              </span>
            )}
          </div>
        </div>

        <span className="Tab-date">{createDate}</span>

        <div>
          {affect && (
            <button className="general-btn"> Affecter document</button>
          )}
          {add && (
            <button className="general-btn"> Ajouter un utilisateur</button>
          )}
          <img
            src={del}
            onClick={handleDelete}
            alt="delete"
            className="Tab-icon"
            data-id={component_id}
            data-path={path}
          />
          {!gestion && (
            <img src={download} alt="download" className="Tab-icon" />
          )}
        </div>
      </div>
    </div>
  )
}

export default TabLine
