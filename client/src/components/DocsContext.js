import { createContext } from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

export const DocsContext = createContext({})
var url = document.location.origin;
const getLogStatus = async function () {
  var result = false;
  await Axios.get(url + ':3001/checklogin').then((res)=>{result = res.data});
  return result;
}

const DocsContextProvider = ({ children }) => {
  const [checkeds, setCheckeds] = useState([]);
  const [search, setSearch] = useState("");

  const [activeDocs, setActiveDocs] = useState([]);
  const [docsInfo, setDocsInfo] = useState('');
  const [foldersInfos, setFolderInfo] = useState('');
  var savedLog = false;
  const [logged, setLogged] = useState(savedLog ? JSON.parse(savedLog) : false);
  getLogStatus().then(function(res){
    savedLog = res;
    setLogged(savedLog)
  });
  // const [docs, setDocs] = useState([]);

  return (
    <DocsContext.Provider
      value={{
        checkeds,
        setCheckeds,
        activeDocs,
        setActiveDocs,
        logged,
        setLogged,
        search,
        setSearch,
        docsInfo,
        setDocsInfo,
        foldersInfos,
        setFolderInfo
      }}
    >
      {children}
    </DocsContext.Provider>
  )
}

export default DocsContextProvider
