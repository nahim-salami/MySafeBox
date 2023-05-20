import React, { useContext } from "react"
import { DocsContext } from "../components/DocsContext"
import Layout from "../components/Layout"
import Modal from "../components/Modal"
import { useModalContext } from "../components/ModalContext"
import TabHead from "../components/TabHead"
import TabLine from "../components/TabLine"
import { users } from "../datas/docInfo"

function GestionUtilisateurs() {
  const { activeDocs, search } = useContext(DocsContext)
  const {modalIsOpen, setModalIsOpen, openModal, inputStyle} = useModalContext()

  return (
    <Layout docs={users}>
      <div>
        <div className="custom-bar">
          <button className="general-btn" onClick={openModal}>Ajouter des utilisateurs en masse</button>
          <button className="general-btn" onClick={() => setModalIsOpen(true)}>Ajouter utilisateur</button>
          <button className="junk">Voir corbeille</button>
        </div>
      </div>
      <Modal title={"Nouvel Utilisateur"} open={modalIsOpen} setOpen={setModalIsOpen} actionText="Ajouter" handleClose={() => setModalIsOpen(false)}>
      <form action="" encType="multipart/form-data">
         <label >
          Id 
          <input type="text" style={inputStyle} />
        </label>
        <label >
          Nom
          <input type="text" style={inputStyle} />
        </label>
        <label >
          Prénom
          <input type="text" style={inputStyle} />
        </label>
        <label style={{marginTop: 25, display: 'inline-block', width: '100%'}}>
          Affecter document
          <input type="file" accept="image/*" style={{...inputStyle, padding: '10px 5px'}} />
        </label>
      </form>
       
      </Modal>
      <p className="tab-description">Liste des utilisateurs / employés</p>
      {activeDocs.length ? (
        <>
          <TabHead
            col1={"Nom"}
            col2="Prénom"
            three
            lines={users.map(({ id }) => id)}
          />
          {activeDocs.map(
            (doc, idx) =>
              (!search ||
                doc.name.toLowerCase().includes(search.toLowerCase())) && (
                <TabLine {...doc} gestion affect key={idx} />
              )
          )}
        </>
      ) : (
        <div className="no-doc">Aucun Utilisateur.</div>
      )}
    </Layout>
  )
}

export default GestionUtilisateurs
