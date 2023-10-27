import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { IContactDeleteProps } from '../data/contacts/types';

export const ContactDelete: React.FC<IContactDeleteProps> = ({ contact, onDelete, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(contact);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {contact.name}?</p>
      </Modal.Body>
      <Modal.Footer>
        {isDeleting ? (
          <Button variant="danger" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            Deleting...
          </Button>
        ) : (
          <>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};
