import React, { useContext } from 'react'
import Layout from '../components/Layout'
import '../styles/MesDossiers.css'
import { foldersInfos } from '../datas/docInfo'
import TabHead from '../components/TabHead'
import TabLine from '../components/TabLine'
import { DocsContext } from '../components/DocsContext'
import { useModalContext } from '../components/ModalContext'
import Modal from '../components/Modal'

function MesDossiers() {
  const { activeDocs, search, setActiveDocs } = useContext(DocsContext)
  const { modalIsOpen, setModalIsOpen, openModal, inputStyle } = useModalContext()
  const [docName, setDocName] = React.useState("");

  return (
    <Layout docs={foldersInfos}>
      <div className="MesDossiers">
        <div className="custom-bar">
          <button className="general-btn" onClick={openModal}>
            Ajouter un dossier
          </button>
          <button className="junk">Voir corbeille</button>
        </div>
        <Modal
          open={modalIsOpen}
          setOpen={setModalIsOpen}
          actionText="Ajouter"
          handleClose={() => {
            if(docName){
            setActiveDocs((prev) => [
              ...prev,
              {
                date: '05/04/2023',
                fileType: 'contrat',
                id: 9,
                name: docName,
                type: 'folder',
              },
            ])}
            setModalIsOpen(false)
          }}
          title="Nouveau dossier"
        >
          <label htmlFor="name-doc">
            Nom
            <input
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
              type="text"
              style={inputStyle}
              id="name-doc"
              name="name-doc"
            />
          </label>
        </Modal>

        {activeDocs.length ? (
          <>
            <TabHead
              col1={'Dossiers'}
              col2="Dernière date de changement"
              lines={foldersInfos.map(({ id }) => id)}
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
