import React, { useEffect, useReducer, useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { NavBar } from './components/Nav';
import { IContact } from './data/contacts';
import { apiFetchAllContacts } from './data/contacts';
import { contactsReducer } from './data/contacts/contactsReducer';

const App = () => {
    const [contacts, dispatch] = useReducer(contactsReducer, []);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const fetchedContacts = await apiFetchAllContacts();
            dispatch({ type: 'SET_CONTACTS', payload: fetchedContacts });
        } catch (error) {
            console.error(error);
        }
    };

    const handleContactAdd = (newContact: IContact) => {
        dispatch({ type: 'ADD_CONTACT', payload: newContact });
    };

    return (
        <>
            <NavBar contacts={contacts} dispatch={dispatch} />
            <div className="App container">
                <ContactForm onContactAdd={handleContactAdd} />
                <ContactList contacts={contacts} dispatch={dispatch} showActions={true} />       
            </div>
        </>
    );
};

export default App;
