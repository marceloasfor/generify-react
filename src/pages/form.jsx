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
    const { createUser, handleLogin } = useContext(Context); // Authentication validations

    const [formValues, setFormValues] = useState(initialValues);    // Manage user values
    const [formErrors, setFormErrors] = useState({});   // Stores errors in validation
    const [isSubmit, setIsSubmit] = useState(false);    // Handle if form was submitted for useEffect

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });    // Set user values to input
        //console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));    // Validation
        setIsSubmit(true);
    };

    useEffect(() => {   // Adds user to users array and redirect to Login page if 0 errors found 
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            createUser(formValues);
            handleLogin(formValues);
            navigate("/home"); // ADJUST REDIRECT TO HOME
        }
    }, [formErrors, isSubmit, navigate, createUser, formValues]);

    const validate = (values) => {  // Inputs validations
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

    return (
        <div className="pg-form container">
            <div className="pg-form container-fluid row align-items-center justify-content-center">
                <div className='col-10 col-md-8 col-lg-6 d-flex justify-content-center border border-light rounded bg-light text-dark shadow-lg'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-3" controlId="formTitle">
                            <Form.Label><h1>Cadastre-se e comece a curtir</h1></Form.Label>
                        </Form.Group>

                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type='text' name='username' placeholder='Escolha um nome de usuário' value={formValues.username} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {formErrors.username}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Digite seu e-mail" value={formValues.email} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {formErrors.email}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Digite uma senha' value={formValues.password} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {formErrors.password}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPasswordDoubleCheck'>
                            <Form.Label>Confirme a senha</Form.Label>
                            <Form.Control type='password' name='passwordCheck' placeholder='Repita a senha' value={formValues.passwordCheck} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {formErrors.passwordCheck}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicDatePicker">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="date" name='birthDate' value={formValues.birthDate} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                {formErrors.birthDate}
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
