import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filter } = contactContext;
  const filterContacts = () => {
    if (filter) {
      const regex = new RegExp(filter, 'gi');
      return contacts.filter(c => c.name.match(regex) || c.email.match(regex));
    }
    return contacts;
  };

  if (contacts.length === 0) {
    return <h4>Please add a contact...</h4>;
  }

  const renderContacts = () => {
    return filterContacts().map(contact => (
      <CSSTransition key={contact.id} timeout={500} classNames="item">
        <ContactItem contact={contact} />
      </CSSTransition>
    ));
  };
  return (
    <>
      <TransitionGroup>{renderContacts()}</TransitionGroup>
    </>
  );
};

export default Contacts;
