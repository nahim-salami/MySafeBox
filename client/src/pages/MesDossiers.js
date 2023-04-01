import React, { useContext } from "react"
import Layout from "../components/Layout"
import "../styles/MesDossiers.css"
//import { foldersInfos } from "../datas/docInfo"
import TabHead from "../components/TabHead"
import TabLine from "../components/TabLine"
import { DocsContext } from "../components/DocsContext"
import Axios from "axios";

function MesDossiers() {
  var url = document.location.origin;
  const { activeDocs, search, foldersInfos } = useContext(DocsContext);
  const createFolder = function (e) {
    var folderName = prompt("Nom du dossier");
    Axios.post("http://3.14.129.203/createFolder", {
      folderName: folderName,
      path: '/',
      status: 'draft'
    }).then((response) => {
      alert(response.data)
    })
  }
  return (
    <Layout docs={foldersInfos} type="folder">
      <div className="MesDossiers">
        <div className="custom-bar">
          <button className="general-btn" onClick={createFolder}>Ajouter un dossier</button>
          <button className="junk">Voir corbeille</button>
        </div>

        {activeDocs.length ? (
          <>
            <TabHead
              col1={"Dossiers"}
              col2="Dernière date de changement"
              lines={(typeof foldersInfos.map === "function") ? foldersInfos.map(({ id }) => id) : {}}
            />
            {activeDocs.map(
              (doc, idx) =>
                (!search ||
                  doc.name.toLowerCase().includes(search.toLowerCase())) && (
                  <TabLine {...doc} fileType={undefined} key={idx} />
                )
            )}
          </>
        ) : (
          <div className="no-doc">
            Aucun dossier partagé . Les dossiers partagés vous permettent de
            partagés des documents stockés dans votre coffre fort avec une ou
            plusieurs personnes de votre choix .<br />
            <br /> Vous pouvez décider qui a accès à vos documents et pour
            combien de temps .
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MesDossiers
