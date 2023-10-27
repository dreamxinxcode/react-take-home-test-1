import React from 'react';
import Card from 'react-bootstrap/Card';
import { IContactCardProps } from '../data/contacts/types';

export const ContactCard: React.FC<IContactCardProps> = ({ contact }) => {
  return (
    <Card className="mt-3 mb-3">
      <Card.Body>
        <Card.Title>{contact.name}</Card.Title>
        {contact.phone && <Card.Text>Phone: {contact.phone}</Card.Text>}
        {contact.age && <Card.Text>Age: {contact.age}</Card.Text>}
        {contact.email && <Card.Text>Email: {contact.email}</Card.Text>}
      </Card.Body>
    </Card>
  );
};
