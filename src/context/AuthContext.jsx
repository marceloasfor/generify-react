import React, { createContext, useState } from "react";
import formErrors from '../pages/form';

const Context = createContext();
const users = [];   // Users array

function AuthProvider({ children }) {   // Component for context validations

    const [authenticated, setAuthenticated] = useState(false);  // Boolean if user is athenticated

    function handleLogin(userLogin) {   // Search login values in users array
        const userCheck = users.some(user => user.username === userLogin.username && user.password === userLogin.password);
        if (userCheck) {
            setAuthenticated(true);
        }
    }

    function handleLogout() {
        setAuthenticated(false);
    }

    function createUser(userDetails) {  // Add form values in users array
        if (Object.keys(formErrors).length === 0) {
            users.push(userDetails);
            console.log("Usuário criado!");
            console.log(users);
        }
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, createUser, handleLogout }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };