import React, { useState } from "react";
import Axios from "axios";
function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [adress, setAdress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [component, setComponent] = useState("");
    const [componentName, setComponentName] = useState("");
    const [componentType, setComponentType] = useState("");
    const [componentCategorie, setComponentCategorie] = useState("");
    const [folderName, setFolderName] = useState("");

    const setComponentData = (e) => {
        let reader = new FileReader();
        var files = e.target.files[0];
        setComponentName(files.name);
        setComponentType(files.type);
        console.log(files.name)
        reader.readAsDataURL(files);
        reader.onload = function() {
            setComponent(reader.result)
          };
    }

    const createComponent = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/component", {
            name: componentName,
            type: componentType,
            path: component,
            categorie: componentCategorie,
            folderName: "/",
            folderPath: "/",
            status: "DRAFT"
        }).then((response) => {
            console.log(response)
        })
    }

    const signin = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/signin", {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response)
        })
    }

    const signup = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/signup", {
            username: username,
            password: password,
            birthday: birthday,
            lastname: lastname,
            firstname: firstname,
            mail: mail,
            adress: adress
        }).then((response) => {
            console.log(response)
        })
    }


    const createFolder = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/createFolder", {
            folderName: folderName,
            path: "/",
            status: "DRAFT"
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div>
            <h1>Welcome to MYSAFEBOX</h1>
            <h4>We change the wolrd</h4>
            <header>
                <form>
                    <input type="text" name="username" onChange={(e) => { setUsername(e.target.value) }} />
                    <input type="text" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="submit" name="submit" onClick={signin} />
                </form>
                <form>
                    <input type="text" name="username" placeholder="username" onChange={(e) => { setUsername(e.target.value) }} />
                    <input type="password" name="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="email" name="mail" placeholder="mail" onChange={(e) => { setMail(e.target.value) }} />
                    <input type="text" name="firstname" placeholder="firstname" onChange={(e) => { setFirstName(e.target.value) }} />
                    <input type="text" name="lastname" placeholder="lastname" onChange={(e) => { setLastName(e.target.value) }} />
                    <input type="text" name="adress" placeholder="adress" onChange={(e) => { setAdress(e.target.value) }} />
                    <input type="date" name="birthday" placeholder="birthday" onChange={(e) => { setBirthday(e.target.value) }} />
                    <input type="submit" name="submit" onClick={signup} />
                </form>
                <form>
                    <input type="file" onChange={setComponentData} />
                    <select onChange={(e) => { setComponentCategorie(e.target.value) }}>
                        <option value="contrat">Contrat</option>
                        <option value="buletin">Buletin</option>
                        <option value="attestation">Attestation</option>
                    </select>
                    <input type="text" onChange={(e) => { setFolderName(e.target.value) }} />
                    <input type="submit" value="create folder" onClick={createFolder} />

                    <input type="submit" onClick={createComponent} />
                </form>
            </header>
        </div>
    );
}

export default Home;