import React, { useContext, useState } from "react"
import Layout from "../components/Layout"
import { docsInfo } from "../datas/docInfo"
import TabHead from "../components/TabHead"
import TabLine from "../components/TabLine"
import { DocsContext } from "../components/DocsContext"
import Axios from "axios";

function GestionDocuments() {
  const { activeDocs, search } = useContext(DocsContext)

  const setComponentData = (e) => {
    let reader = new FileReader();
    var files = e.target.files[0];
    if(typeof files === "undefined") return;
    reader.readAsDataURL(files);
    reader.onload = function() {
        Axios.post("http://localhost:3001/component", {
            name: files.name,
            type: files.type,
            path: reader.result,
            categorie: "default",
            folderName: "/",
            folderPath: "/",
            status: "DRAFT"
        }).then((response) => {
            console.log(response)
        })
      };
  }

  const addFiles = function(e) {
    document.querySelector(".userfile").click()
  }
  return (
    <Layout docs={docsInfo}>
      <div>
        <div className="custom-bar">
          <button className="general-btn" onClick={addFiles}>Ajouter fichier zip</button>
          <button className="general-btn" onClick={addFiles}>Ajouter fichier csv</button>
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
