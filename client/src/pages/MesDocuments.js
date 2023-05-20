import React, { useContext } from "react"
import Axios from "axios";
import "../styles/MesDocuments.css"
import Layout from "../components/Layout"
import { docsInfo } from "../datas/docInfo"
import TabHead from "../components/TabHead"
import TabLine from "../components/TabLine"
import { DocsContext } from "../components/DocsContext"
import { getCookie, setCookie, apiUrl, apiBaseUrl } from "../components/utils";

function MesDocuments() {
  const { activeDocs, search } = useContext(DocsContext);
  const isLog = getCookie("msfb-logged");
  console.log(isLog)
  
  return (
    <Layout docs={docsInfo}>
      <div className="Mes-documents">
        <div className="custom-bar">
          <button className="junk">Voir corbeille</button>
        </div>

        {activeDocs.length ? (
          <>
            <TabHead
              col1={"Documents"}
              col2="Dernière date de changement"
              lines={docsInfo.map(({ id }) => id)}
            />
            {activeDocs.map(
              (doc, idx) =>
                (!search ||
                  doc.name.toLowerCase().includes(search.toLowerCase())) && (
                  <TabLine {...doc} key={idx} />
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

export default MesDocuments
