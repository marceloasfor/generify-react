import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const Forms = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    birthDate: ""
  };

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    //console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) navigate("/");
  }, [formErrors]);

  const validate = (values) => {
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
    if (!values.birthDate) errors.birthDate = "Data de nascimento é obrigatório!";

    return errors;
  };

  return (
    <div className="pg-form container">
      <div className="pg-form container-fluid row align-items-center justify-content-center">
        <div className='col-10 col-md-8 col-lg-6 d-flex justify-content-center'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3" controlId="formTitle">
              <Form.Label><h1>Cadastre-se e comece a curtir</h1></Form.Label>
            </Form.Group>

            <Form.Group controlId='formBasicUsername'>
              <Form.Label>Usuário</Form.Label>
              <Form.Control type='text' name='username' placeholder='Escolha um nome de usuário' value={formValues.username} onChange={handleChange} />
            </Form.Group>

            <p>{formErrors.username}</p>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" name='email' placeholder="Digite seu e-mail" value={formValues.email} onChange={handleChange} />
            </Form.Group>

            <p>{formErrors.email}</p>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Senha</Form.Label>
              <Form.Control type='password' name='password' placeholder='Digite uma senha' value={formValues.password} onChange={handleChange} />
              <Form.Text className="text-muted">
                A senha precisa ter no mínimo 4 caracteres.
              </Form.Text>
            </Form.Group>

            <p>{formErrors.password}</p>

            <Form.Group controlId="formBasicDatePicker">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control type="date" name='birthDate' value={formValues.birthDate} onChange={handleChange} />
            </Form.Group>

            <p>{formErrors.birthDate}</p>

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

export default Forms;
