import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IContactCardProps } from '../data/contacts/types';

export const ContactCard: React.FC<IContactCardProps> = ({ contact, onEdit, onDelete, showActions }) => {
  return (
    <Card className="mt-3 mb-3">
      <Card.Body>
        <Card.Title>{contact.name}</Card.Title>
        {contact.phone && <Card.Text>Phone: {contact.phone}</Card.Text>}
        {contact.age && <Card.Text>Age: {contact.age}</Card.Text>}
        {contact.email && <Card.Text>Email: {contact.email}</Card.Text>}
        {showActions && (
          <>
            <Button variant="primary" className="me-2" onClick={() => onEdit(contact)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(contact.id)}>
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};