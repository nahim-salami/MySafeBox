import Axios from "axios";
import React, { useContext, useEffect, useLayoutEffect } from "react"
import SecondBanner from "./SecondBanner"
import "../styles/Layout.css"
import { DocsContext } from "./DocsContext"
import { getCookie, setCookie, apiUrl, apiBaseUrl } from "../components/utils";

var url = document.location.origin;
const msfbUserData = JSON.parse(getCookie("msfb-user-data"));

const getDocData = async function (data) {
  return await Axios.post(apiUrl.componentlist, data)
}

const getFolderData = async function (data) {
  return await Axios.post(apiUrl.folderList, data)
}
function Layout({ children, docs, type }) {
  const { setActiveDocs, setSearch, setCheckeds } = useContext(DocsContext)
  const msfbUserData = JSON.parse(getCookie("msfb-user-data"));

  useLayoutEffect(() => {
    if(type != "folder") {
      getDocData({token:msfbUserData.data.token}).then((res)=>{
        setActiveDocs((res.data) ? res.data : []);
      })
    }
    else {
      getFolderData({token:msfbUserData.data.token}).then((res)=>{
        setActiveDocs((res.data) ? res.data : []);
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
