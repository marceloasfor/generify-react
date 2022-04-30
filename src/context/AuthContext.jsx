import React, { createContext, useState } from "react";
import formErrors from '../pages/form';

const axios = require('axios').default;

const Context = createContext();

function AuthProvider({ children }) {   // Component for context validations

    const [authenticated, setAuthenticated] = useState(false);  // Boolean if user is athenticated
    const [alertMsg, setAlertMsg] = useState("Bem-vindo!"); // Alert pop-up message in navbar
    const [loginErrors, setLoginErrors] = useState({});   // Stores errors in validation
    const [currentUser, setCurrentUser] = useState();


    const validate = (values, valid) => {  // Inputs validations
        const errors = {};
        if (!values.username || !values.password) {
            if (!values.username) errors.username = "Usuário é obrigatório!";
            if (!values.password) errors.password = "Senha é obrigatória!";
            return errors;
        }
        if (!valid) {
            errors.username = "Usuário não encontrado!";
            errors.password = "Senha incorreta!";
            return errors;
        }
    };

    async function handleLogin(userLogin) {   // Search login values in users array
        let users;
        await axios.get(`http://localhost:8080/users`)
            .then(
                (response) => {
                    users = response.data;
                }
            )
        const userCheck = users.some(user => user.username === userLogin.username && user.password === userLogin.password);
        if (userCheck) {
            setAuthenticated(true);
            setAlertMsg(`Login realizado, bem-vindo ${userLogin.username}!`);
            setCurrentUser(users.find((user) => (user.username === userLogin.username && user.password === userLogin.password)))
        }
        setLoginErrors(validate(userLogin, userCheck));
    }

    function handleLogout() {
        setAuthenticated(false);
        setCurrentUser({});
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
            axios.post(`http://localhost:8080/users`, user);
            handleLogin(user);
            setAlertMsg(`Usuário criado, bem-vindo ${user.username}!`);
        }
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, createUser, handleLogout, alertMsg, loginErrors, currentUser }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };