import { useState } from 'react';
import React from "react";
import Form from 'react-bootstrap/Form';

const Forms = () => {

  return (
    <div className="pg-form container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            Teste
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Forms;
