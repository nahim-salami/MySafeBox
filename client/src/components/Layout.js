import React, { useContext, useEffect, useLayoutEffect } from "react"
import SecondBanner from "./SecondBanner"
import "../styles/Layout.css"
import { DocsContext } from "./DocsContext"
import Axios from "axios";

const getDocData = async function () {
  return await Axios.post("http://localhost:3001/componentlist")
}

const getFolderData = async function () {
  return await Axios.post("http://localhost:3001/folderList")
}

function Layout({ children, docs, type }) {
  const { setActiveDocs, setSearch, setCheckeds } = useContext(DocsContext);

  useLayoutEffect(() => {
    if(type != "folder") {
      getDocData().then((res)=>{
        setActiveDocs(res.data);
      })
    }
    else {
      getFolderData().then((res)=>{
        setActiveDocs(res.data);
      })
    }
    
    setSearch("")
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setCheckeds([])
  }, [setCheckeds])

  return (
    <div className="Layout">
      <SecondBanner />
      {children}
    </div>
  )
}

export default Layout
