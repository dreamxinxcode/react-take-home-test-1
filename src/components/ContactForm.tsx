import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { apiAddContact } from '../data/contacts/api';
import { generateUUID } from '../util/guid';
import { IContactFormProps } from '../data/contacts/types';

export const ContactForm: React.FC<IContactFormProps> = ({ dispatch }) => {
  const initialValues = {
    name: '',
    phone: '',
    email: '',
    age: '',
  };

  const [formData, setFormData] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setValidated(false); // Reset validation state
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const form = event.currentTarget as HTMLFormElement;
    
    setValidated(true);
  
    if (form.checkValidity() === false) {
      return;
    }
  
    try {
      const contact = {
        id: generateUUID(),
        ...formData,
        age: parseInt(formData.age, 10),
      };
  
      setIsLoading(true);
  
      // Use the dispatch prop to add the new contact
      dispatch({ type: 'ADD_CONTACT', payload: contact });
  
      setFormData(initialValues);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <FloatingLabel label="Name" controlId="nameControl" className="mb-3">
        <Form.Control
          required
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="Phone number" controlId="phoneControl" className="mb-3">
        <Form.Control
          required
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid">Please provide a phone number.</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="Email" controlId="emailControl" className="mb-3">
        <Form.Control
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid">Please provide an email.</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="Age" controlId="ageControl" className="mb-3">
        <Form.Control
          required
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid">Please provide an age.</Form.Control.Feedback>
      </FloatingLabel>

      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Spinner animation="border" size="sm" /> : 'Submit'}
      </Button>
    </Form>
  );
};
