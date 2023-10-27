import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ContactList } from './ContactList';
import { IContact } from '../data/contacts';
import { INavProps } from '../data/contacts/types';

export const NavBar: React.FC<INavProps> = ({ contacts, dispatch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<IContact[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter contacts based on the search query
        const filteredContacts = query
            ? contacts.filter((contact: IContact) =>
                contact.name.toLowerCase().includes(query)
            )
            : [];

        setResults(filteredContacts);
    };

    return (
        <Navbar expand={false} className="bg-body-tertiary mb-3" bg="primary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-false`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                            Quick Search
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search contacts"
                                className="me-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        {searchQuery ? <h3>Results ({results.length})</h3> : null}
                        <ContactList contacts={results} dispatch={dispatch} showActions={false}></ContactList>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};