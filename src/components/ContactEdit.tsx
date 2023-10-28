import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { IContactEditProps } from '../data/contacts/types';

export const ContactEdit: React.FC<IContactEditProps> = ({ contact, onSave, onCancel, dispatch }) => {
    const [editedContact, setEditedContact] = useState(contact);
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedContact({ ...editedContact, [name]: value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        await onSave(editedContact);
        setIsSaving(false);
        onCancel();
    };
    
    return (
        <Modal show={true}>
            <Modal.Header closeButton>
                <Modal.Title>{contact.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel label="Name" controlId="nameControl" className="mb-3">
                        <Form.Control
                        type="text"
                        name="name"
                        value={editedContact.name}
                        onChange={handleInputChange}
                        required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
                    </FloatingLabel>
                    
                    <FloatingLabel label="Phone number" controlId="phoneControl" className="mb-3">
                        <Form.Control
                        type="text"
                        name="phone"
                        value={editedContact.phone}
                        onChange={handleInputChange}
                        required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a phone number.</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel label="Email" controlId="emailControl" className="mb-3">
                        <Form.Control
                        type="email"
                        name="email"
                        value={editedContact.email}
                        onChange={handleInputChange}
                        required
                        />
                        <Form.Control.Feedback type="invalid">Please provide an email.</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel label="Age" controlId="ageControl" className="mb-3">
                        <Form.Control
                        type="number"
                        name="age"
                        value={editedContact.age}
                        onChange={handleInputChange}
                        required
                        />
                        <Form.Control.Feedback type="invalid">Please provide an age.</Form.Control.Feedback>
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                {isSaving ? (
                    <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        Saving...
                    </>
                ) : (
                    'Save'
                )}
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
