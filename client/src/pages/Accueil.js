import React, { useContext } from "react"
import Box from "../components/Box"
import { DocsContext } from "../components/DocsContext"
import Layout from "../components/Layout"
import TabHead from "../components/TabHead"
import TabLine from "../components/TabLine"
import { docsInfo } from "../datas/docInfo.js"
import Connexion from "./Connexion"
import "../styles/Accueil.css"

function Accueil() {
  const docs = docsInfo.slice(0, 3)

  const { activeDocs, search, logged } = useContext(DocsContext)
  console.log(activeDocs)
  return (
    <>
      {!logged ? (
        <Connexion />
      ) : (
        <Layout docs={docs}>
          <div className="Accueil">
            <div className="box-container">
              <Box
                color={"rgba(41, 181, 211, 0.56)"}
                type={"people"}
                value={50}
                description={"Employes"}
              />
              <Box
                color={"rgba(99, 42, 192, 0.44)"}
                type={"folder"}
                value={activeDocs.length}
                description="Documents"
              />
              <Box
                color="rgba(19, 100, 42, 0.44)"
                type="calendar"
                value={activeDocs.length == 0 ? 'Auccun' : new Date(activeDocs[activeDocs.length-1].createDate).toLocaleDateString() }
                description="Derniers partages"
              />
            </div>

            <p className="tab-description">Documents recents</p>
            <TabHead
              col1={"Documents"}
              col2="Dernière date de changement"
              lines={docs.map((doc) => doc.component_id)}
              background
            />
             {activeDocs.map(
              (doc, idx) =>
                (!search ||
                  doc.nom.toLowerCase().includes(search.toLowerCase())) && (
                  <TabLine
                  {...doc} key={idx}
                  />
                )
            )}
          </div>
        </Layout>
      )}
    </>
  )
}

export default Accueil
