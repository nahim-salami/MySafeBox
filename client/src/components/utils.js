export const apiBaseUrl = "http://3.145.107.213:5000/";

export const apiUrl = {
    login: apiBaseUrl + 'signin',
    register: apiBaseUrl + 'signup',
    userData: apiBaseUrl + 'userData',
    checklogin: apiBaseUrl + 'checklogin',
    folderList: apiBaseUrl + 'folderList',
    addComponent: apiBaseUrl + 'component',
    createFolder: apiBaseUrl + 'createFolder',
    removeFolder: apiBaseUrl + 'removeFolder',
    componentlist: apiBaseUrl + 'componentlist',
    removeComponent: apiBaseUrl + 'removeComponent',
};

export const setCookie = (cname, cvalue, exdays = 30) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
