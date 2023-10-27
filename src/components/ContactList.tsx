import React, { useState } from 'react';
import { ContactCard } from './ContactCard';
import { ContactEdit } from './ContactEdit';
import { ContactDelete } from './ContactDelete';
import { apiDeleteContact, apiUpdateContact } from '../data/contacts';
import { IContact, IContactListProps } from '../data/contacts/types';

export const ContactList: React.FC<IContactListProps> = ({ contacts, dispatch, showActions }) => {
  const [editingContact, setEditingContact] = useState<IContact | null>(null);
  const [deletingContact, setDeletingContact] = useState<IContact | null>(null);

  const handleEdit = (contact: IContact) => {
    setEditingContact(contact);
    setDeletingContact(null);
  };

  const handleDelete = (contact: IContact) => {
    setDeletingContact(contact);
    setEditingContact(null);
  };

  const handleSaveEdit = async (editedContact: IContact) => {
    try {
      await apiUpdateContact(editedContact);
      dispatch({ type: 'EDIT_CONTACT', payload: editedContact });
    } catch (error) {
      console.error(error);
    }
    setEditingContact(null);
  };

  const handleConfirmDelete = async (contact: IContact) => {
    try {
      await apiDeleteContact(contact.id);
      dispatch({ type: 'DELETE_CONTACT', payload: contact.id });
    } catch (error) {
      console.error(error);
    }
    setDeletingContact(null);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleCancelDelete = () => {
    setDeletingContact(null);
  };

  return (
    <div>
      {contacts &&
        contacts.map((contact: IContact) => (
          <div key={contact.id}>
            <ContactCard
              contact={contact}
              onEdit={() => handleEdit(contact)}
              onDelete={() => handleDelete(contact)}
              showActions={showActions}
            />
            {editingContact === contact && (
              <ContactEdit
                contact={contact}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                dispatch={dispatch}
              />
            )}
            {deletingContact === contact && (
              <ContactDelete
                contact={contact}
                onDelete={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
          </div>
        ))}
    </div>
  );
};
