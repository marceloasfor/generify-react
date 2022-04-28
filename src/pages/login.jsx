import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Context } from '../context/AuthContext';

const Login = () => {

    const loginValues = { // Login values structure
        username: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(loginValues);    // Manage login values
    const navigate = useNavigate(); // Hook for routes redirection
    const { authenticated, handleLogin, loginErrors } = useContext(Context); // Authentication validations

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });    // Set login values to inputs
        //console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formValues);    // Check if login values == user values and Validation
    };

    useEffect(() => {   // Listen to authenticated value
        if (authenticated) {
            navigate("/playlists");
        }
    }, [authenticated, navigate, loginErrors]);

    return (
        <div className="pg-form container">
            <div className="pg-form container-fluid row align-items-center justify-content-center">
                <div className='col-10 col-md-8 col-lg-6 d-flex justify-content-center border border-light rounded bg-light text-dark shadow-lg'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-3" controlId="formTitle">
                            <Form.Label><h1>Faça o login</h1></Form.Label>
                        </Form.Group>

                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type='text' name='username' placeholder='Escolha um nome de usuário' value={formValues.username} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {loginErrors && loginErrors.username}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Digite uma senha' value={formValues.password} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {loginErrors && loginErrors.password}
                            </Form.Text>
                        </Form.Group>

                        <div className='d-flex justify-content-center'>
                            <Button className='mt-3 mb-3' variant='primary' type='submit'>
                                Login
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
