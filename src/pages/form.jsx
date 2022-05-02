import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Context } from '../context/AuthContext';

const Forms = () => {
    const initialValues = { // User values structure
        username: "",
        email: "",
        password: "",
        passwordCheck: "",
        birthDate: ""
    };

    const navigate = useNavigate(); // Hook for routes redirection
    const { createUser, createErrors, checkCreateErrors } = useContext(Context); // Authentication validations
    const [formValues, setFormValues] = useState(initialValues);    // Manage user values
    const [isSubmit, setIsSubmit] = useState(false);    // Handle if form was submitted for useEffect

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });    // Set user values to input
        //console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkCreateErrors(formValues);    // Validation
        setIsSubmit(true);
    };

    useEffect(() => {   // Adds user to users array and redirect to Playlists page if 0 errors found 
        if (Object.keys(createErrors).length === 0 && isSubmit) {
            createUser(formValues)
            navigate("/playlists");
        }
    }, [createErrors, isSubmit, navigate, createUser, formValues]);

    return (
        <div className="pg-form container">
            <div className="pg-form container-fluid row align-items-center justify-content-center">
                <div className='col-10 col-md-8 col-lg-6 d-flex justify-content-center rounded bg-light bg-opacity-50 text-dark shadow-lg'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-3" controlId="formTitle">
                            <Form.Label><h1>Cadastre-se e comece a curtir</h1></Form.Label>
                        </Form.Group>

                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type='text' name='username' placeholder='Escolha um nome de usuário' value={formValues.username} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {createErrors.username}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Digite seu e-mail" value={formValues.email} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {createErrors.email}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Digite uma senha' value={formValues.password} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {createErrors.password}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPasswordDoubleCheck'>
                            <Form.Label>Confirme a senha</Form.Label>
                            <Form.Control type='password' name='passwordCheck' placeholder='Repita a senha' value={formValues.passwordCheck} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {createErrors.passwordCheck}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicDatePicker">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="date" name='birthDate' value={formValues.birthDate} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {createErrors.birthDate}
                            </Form.Text>
                        </Form.Group>

                        <div className='d-flex justify-content-center'>
                            <Button className='mt-3 mb-3' variant='primary' type='submit'>
                                Criar Conta
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Forms;
