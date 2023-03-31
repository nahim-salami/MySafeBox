import "../styles/App.css"
import { Route, Routes, HashRouter as Router } from "react-router-dom"
import Banner from "./Banner"
import Accueil from "../pages/Accueil"
import "../styles/second-part.css"
import MesDocuments from "../pages/MesDocuments"
import MesDossierspartages from "../pages/MesDossierspartages"
import MesDossiers from "../pages/MesDossiers"
import GestionDocuments from "../pages/GestionDocuments"
import GestionUtilisateurs from "../pages/GestionUtilisateurs"
import GestionGroupes from "../pages/GestionGroupes"
import DocsContextProvider from "./DocsContext"

function App() {
  return (
    <DocsContextProvider>
      <div className="App">
        <Router>
          <div className="second-part">
            <Banner />
            <div className="page">
              <Routes>
                <Route exact path="/" element={<Accueil />} />
                <Route path="MesDocuments" element={<MesDocuments />} />
                <Route path="MesDossiers" element={<MesDossiers />} />
                <Route
                  path="MesDossierspartages"
                  element={<MesDossierspartages />}
                />
                <Route
                  path="GestionDesdocuments"
                  element={<GestionDocuments />}
                />
                <Route
                  path="GestionDesUtilisateurs"
                  element={<GestionUtilisateurs />}
                />
                <Route path="GestionDesGroupes" element={<GestionGroupes />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </DocsContextProvider>
  )
}

export default App
