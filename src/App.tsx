import { useEffect, useReducer } from 'react';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { NavBar } from './components/Nav';
import { apiFetchAllContacts } from './data/contacts';
import { contactsReducer } from './data/contacts/contactsReducer';
import { useNotification } from './components/NotificationContext';

const App = () => {
    const [contacts, dispatch] = useReducer(contactsReducer, []);
    const { showNotification } = useNotification();

    useEffect(() => {
        (async () => {
            try {
                const fetchedContacts = await apiFetchAllContacts();
                dispatch({ type: 'SET_CONTACTS', payload: fetchedContacts });
            } catch (error) {
                showNotification('Oops! There was a problem fetching your contacts.', 'danger');
            }
        })();
    }, []);

    return (
        <>
            <NavBar contacts={contacts} dispatch={dispatch} />
            <div className="App container">
                <ContactForm dispatch={dispatch} />
                <ContactList contacts={contacts} dispatch={dispatch} showActions={true} />
            </div>
        </>
    );
};

export default App;
