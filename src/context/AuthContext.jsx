import React, { createContext, useState } from "react";

const axios = require('axios').default;

const Context = createContext();

function AuthProvider({ children }) {   // Component for context validations

    const [authenticated, setAuthenticated] = useState(false);  // Boolean if user is athenticated
    const [alertMsg, setAlertMsg] = useState("Bem-vindo!"); // Alert pop-up message in navbar
    const [loginErrors, setLoginErrors] = useState({});   // Stores errors in validation
    const [createErrors, setCreateErrors] = useState({});   // Stores errors in validation
    const [updateErrors, setUpdateErrors] = useState({});
    const [currentUser, setCurrentUser] = useState();


    const validateLogin = (values, valid) => {  // Inputs validations
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
        await axios.get(`http://localhost:8080/api/users/`)
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
        setLoginErrors(validateLogin(userLogin, userCheck));
    }

    function handleLogout() {
        setAuthenticated(false);
        setCurrentUser({});
        setAlertMsg("Bem-vindo!");
    }

    const validateCreate = (values) => {  // Inputs validations
        const errors = {};
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
        if (!values.username) errors.username = "Usuário é obrigatório!";
        if (!values.email) {
            errors.email = "E-mail é obrigatório!";
        } else if (!regex.test(values.email)) {
            errors.email = "Esse não é um formato de e-mail válido!";
        }
        if (!values.password) {
            errors.password = "Senha é obrigatória!";
        } else if (values.password.length < 4) {
            errors.password = "a senha deve ter mais de 4 caracteres";
        }
        if (values.password !== values.passwordCheck) {
            errors.password = "O valor não coincide com a senha informada!";
            errors.passwordCheck = "O valor não coincide com a senha informada!"
        }
        if (!values.birthDate) errors.birthDate = "Data de nascimento é obrigatório!";
        return errors;
    };

    function createUser(userValues) {  // Add form values in users array
        if (Object.keys(createErrors).length === 0) {
            const { username, email, password, birthDate } = userValues
            const user = {
                username,
                email,
                password,
                birthDate,
                playlists: [],
                createdAt: new Date()
            }
            setAlertMsg(`Conta criada, bem-vindo ${user.username}!`);
            setAuthenticated(true);
            // console.log("Usuário criado!");
            // console.log(users);
            axios.post(`http://localhost:8080/api/users/`, user).then(({ data }) => setCurrentUser(data));;
            handleLogin(user);
        }
        setCreateErrors({})
    }

    function checkCreateErrors(userValues) {
        setCreateErrors(validateCreate(userValues))
    }

    function validateUpdate(values) {
        let errors = {};
        if (values.username) {
            const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
            if (!values.username) errors.username = "Usuário é obrigatório!";
            if (!values.email) {
                errors.email = "E-mail é obrigatório!";
            } else if (!regex.test(values.email)) {
                errors.email = "Esse não é um formato de e-mail válido!";
            }
            if (!values.birthDate) errors.birthDate = "Data de nascimento é obrigatório!";
            return errors;
        } else {
            if (!values.password) {
                errors.password = "Senha é obrigatória!";
                errors.passwordCheck = "Senha é obrigatória!";
            } else if (values.password.length <= 4) {
                errors.password = "a senha deve ter mais de 4 caracteres";
                errors.passwordCheck = "a senha deve ter mais de 4 caracteres";
            }
            if (values.password !== values.passwordCheck) {
                errors.password = "O valor não coincide com a senha informada!";
                errors.passwordCheck = "O valor não coincide com a senha informada!";
            }
            return errors;
        }
    }

    function updateUserData({ username, email, birthDate }) {
        if (Object.keys(updateErrors).length === 0) {
            const updatedUser = {
                ...currentUser,
                username,
                email,
                birthDate
            }
            axios.patch(`http://localhost:8080/api/users/${currentUser.id}/`, updatedUser);
            setCurrentUser(updatedUser);
        }
        setUpdateErrors({});
    }

    function updatePassword({ password }) {
        if (Object.keys(updateErrors).length === 0) {
            const updatedUser = {
                ...currentUser,
                password
            }
            axios.patch(`http://localhost:8080/api/users/${currentUser.id}/`, updatedUser);
            setCurrentUser(updatedUser);
        }
        setUpdateErrors({});
    }

    function checkUpdateErrors(updateValues) {
        setUpdateErrors(validateUpdate(updateValues));
    }

    function deleteUser() {
        axios.delete(`http://localhost:8080/api/users/${currentUser.id}/`);
        handleLogout();
    }

    function updateUser() {
        axios.get(`http://localhost:8080/api/users/${currentUser.id}/`)
            .then(
                (response) => {
                    setCurrentUser(response.data);
                }
            )
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, createUser, updateUser, handleLogout, alertMsg, loginErrors, createErrors, checkCreateErrors, currentUser, updateUserData, updatePassword, checkUpdateErrors, updateErrors, deleteUser }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };