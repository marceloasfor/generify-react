import React, { createContext, useState } from "react";
import formErrors from '../pages/form';

const Context = createContext();
const users = [];   // Users array

function AuthProvider({ children }) {   // Component for context validations

    const [authenticated, setAuthenticated] = useState(false);  // Boolean if user is athenticated
    const [alertMsg, setAlertMsg] = useState("Bem-vindo!"); // Alert pop-up message in navbar

    function handleLogin(userLogin) {   // Search login values in users array
        const userCheck = users.some(user => user.username === userLogin.username && user.password === userLogin.password);
        if (userCheck) {
            setAuthenticated(true);
            setAlertMsg(`Login realizado, bem-vindo ${userLogin.username}!`);
        }
        return authenticated;
    }

    function handleLogout() {
        setAuthenticated(false);
    }

    function createUser(userDetails) {  // Add form values in users array
        if (Object.keys(formErrors).length === 0) {
            users.push(userDetails);
            setAuthenticated(true);
            setAlertMsg(`Usuário criado, bem-vindo ${userDetails.username}!`);
            console.log("Usuário criado!");
            console.log(users);
        }
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, createUser, handleLogout, alertMsg }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };