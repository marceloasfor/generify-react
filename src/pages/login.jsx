import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Context } from '../context/AuthContext';

const Login = () => {

    const initialValues = { // Login values structure
        username: "",
        email: "",
        password: "",
        birthDate: ""
    };

    const [formValues, setFormValues] = useState(initialValues);    // Manage login values
    const navigate = useNavigate(); // Hook for routes redirection
    const { authenticated, handleLogin } = useContext(Context); // Authentication validations

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });    // Set login values to inputs
        //console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formValues);    // Check if login values == user values
    };

    useEffect(() => {   // Listen to authenticated value
        if (authenticated) {
            console.log("Usuário reconhecido!");
            navigate("/home");
        } else {
            console.log("Usuário não autenticado!");
            //navigate("/form");
        }
    }, [authenticated, navigate]);

    return (
        <div className="pg-form container">
            <div className="pg-form container-fluid row align-items-center justify-content-center">
                <div className='col-10 col-md-8 col-lg-6 d-flex justify-content-center'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-3" controlId="formTitle">
                            <Form.Label><h1>LOGIN</h1></Form.Label>
                        </Form.Group>

                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type='text' name='username' placeholder='Escolha um nome de usuário' value={formValues.username} onChange={handleChange} />
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Digite seu e-mail" value={formValues.email} onChange={handleChange} />
                        </Form.Group>


                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Digite uma senha' value={formValues.password} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                A senha precisa ter no mínimo 4 caracteres.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group controlId="formBasicDatePicker">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="date" name='birthDate' value={formValues.birthDate} onChange={handleChange} />
                        </Form.Group>


                        <div className='d-flex justify-content-center'>
                            <Button className='mt-3' variant='primary' type='submit'>
                                Criar Conta
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
