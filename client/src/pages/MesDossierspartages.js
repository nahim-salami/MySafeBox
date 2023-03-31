import React, { useContext } from "react"
import { DocsContext } from "../components/DocsContext"
import Layout from "../components/Layout"
import TabHead from "../components/TabHead"
import TabLine from "../components/TabLine"
import { sharedFolders } from "../datas/docInfo"

function MesDossierspartages() {
  const { activeDocs, search } = useContext(DocsContext)

  return (
    <Layout docs={sharedFolders}>
      <div className="MesDossierspartages">
        <div className="custom-bar">
          <button className="junk">Voir corbeille</button>
        </div>

        {activeDocs.length ? (
          <>
            <TabHead
              col1={"Dossiers"}
              col2="Dernière date de changement"
              lines={sharedFolders.map(({ id }) => id)}
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
            combien de temps.
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MesDossierspartages
