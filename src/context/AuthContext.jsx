import React, { createContext, useState } from "react";
import formErrors from '../pages/form';

const axios = require('axios').default;

const Context = createContext();

function AuthProvider({ children }) {   // Component for context validations

    const [authenticated, setAuthenticated] = useState(false);  // Boolean if user is athenticated
    const [alertMsg, setAlertMsg] = useState("Bem-vindo!"); // Alert pop-up message in navbar

    async function handleLogin(userLogin) {   // Search login values in users array
        let users;
        await axios.get(`http://localhost:8080/users`)
            .then(
                (response) => {
                    users = response.data;
                }
            )
        console.log(users)
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

    function createUser({ username, email, password, birthDate }) {  // Add form values in users array
        if (Object.keys(formErrors).length === 0) {
            const user = {
                username,
                email,
                password,
                birthDate,
                createdAt: new Date()
            }
            setAuthenticated(true);
            // console.log("Usuário criado!");
            // console.log(users);
            axios.post(`http://localhost:8080/users`, user)
            setAlertMsg(`Usuário criado, bem-vindo ${user.username}!`);
        }
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, createUser, handleLogout, alertMsg }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };