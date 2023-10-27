import React, { useState } from 'react';
import { ContactCard } from './ContactCard';
import { apiDeleteContact, apiUpdateContact } from '../data/contacts';
import { IContact, IContactListProps } from '../data/contacts/types';

export const ContactList: React.FC<IContactListProps> = ({ contacts }) => {

  return (
    <div>
      {contacts &&
        contacts.map((contact: IContact) => (
          <div key={contact.id}>
            <ContactCard
              contact={contact}
            />
          </div>
        ))}
    </div>
  );
};
