import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const Forms = () => {

  return (
    <div className="pg-form container">
      <div className="pg-form container-fluid row align-items-center justify-content-center">
        <div className='col-10 col-md-8 col-lg-6 d-flex justify-content-center'>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label><h2>Cadastre-se e comece a curtir</h2></Form.Label>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Username' />
            </Form.Group>

            <Form.Group controlId="formBasicDatePicker">
              <Form.Label>Birth date</Form.Label>
              <Form.Control type="date" name='date_of_birth' />
            </Form.Group>

            <div className='d-flex justify-content-center'>
              <Button className='mt-3' variant='primary' type='submit'>
                Create Account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Forms;
