import Axios from "axios";
import React, { useContext, useState } from "react"
import Layout from "../components/Layout"
import { docsInfo } from "../datas/docInfo"
import TabHead from "../components/TabHead"
import TabLine from "../components/TabLine"
import { DocsContext } from "../components/DocsContext"
import { getCookie, setCookie, apiUrl, apiBaseUrl } from "../components/utils";

function GestionDocuments() {
  const { activeDocs, search } = useContext(DocsContext);
  const [fileType, setFileType] = useState("");

  const msfbUserData = JSON.parse(getCookie("msfb-user-data"));
  const setComponentData = (e) => {
    let reader = new FileReader();
    var files = e.target.files[0];
    if(typeof files === "undefined") return;
    reader.readAsDataURL(files);
    reader.onload = function() {
        Axios.post(apiUrl.addComponent, {
            name: files.name,
            type: fileType,
            path: reader.result,
            categorie: "default",
            folderName: "/",
            folderPath: "/",
            status: "DRAFT",
            username: msfbUserData.data.username,
            token: msfbUserData.data.token
        }).then((response) => {
            console.log(response)
        })
      };
  }

  const addFiles = function(e) {
    document.querySelector(".msfb-modal-file-type").classList.remove('display-file-modal')
    document.querySelector(".msfb-modal-file-type").classList.add('hide-file-modal')
    document.querySelector(".userfile").click()
  }

  const displayModal = function() {
    document.querySelector(".msfb-modal-file-type").classList.remove('hide-file-modal')
    document.querySelector(".msfb-modal-file-type").classList.add('display-file-modal')
  }
  
  return (
    <Layout docs={docsInfo}>
      <div className="msfb-modal-file-type hide-file-modal">
        <select className="msfb-file-type" onChange={(e) => { setFileType(e.target.value) }}>
          <option value="facture">Facture</option>
          <option value="contrat">Contrat</option>
          <option value="bulletin">Bulletin</option>
        </select>
        <button onClick={addFiles}>Done</button>
      </div>
      <div>
        <div className="custom-bar">
          <button className="general-btn" onClick={displayModal}>Ajouter fichier zip</button>
          <button className="general-btn" onClick={displayModal}>Ajouter fichier csv</button>
          <button className="junk">Voir corbeille</button>
          <input type="file" className="userfile" onChange={setComponentData}/>
        </div>
      </div>

      {activeDocs.length ? (
        <>
          <TabHead
            col1={"Titre & classe"}
            col2="Dernière date d'éxécution"
            lines={docsInfo.map(({ id }) => id)}
          />
           {activeDocs.map(
            (doc, idx) =>
              (!search ||
                doc.name.toLowerCase().includes(search.toLowerCase())) && (
                <TabLine {...doc} gestion key={idx} />
              )
          )}
        </>
      ) : (
        <div className="no-doc">
          Aucun dossier partagé . Les dossiers partagés vous permettent de
          partagés des documents stockés dans votre coffre fort avec une ou
          plusieurs personnes de votre choix .<br />
          <br /> Vous pouvez décider qui a accès à vos documents et pour combien
          de temps .
        </div>
      )}
    </Layout>
  )
}

export default GestionDocuments
