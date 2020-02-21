import React, { useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filter, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  const filterContacts = () => {
    if (filter) {
      const regex = new RegExp(filter, 'gi');
      return contacts.filter(c => c.name.match(regex) || c.email.match(regex));
    }
    return contacts;
  };

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact...</h4>;
  }

  const renderContacts = () => {
    return (
      <>
        {contacts !== null && !loading ? (
          filterContacts().map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
        ) : (
          <Spinner />
        )}
      </>
    );
  };
  return (
    <>
      <TransitionGroup>{renderContacts()}</TransitionGroup>
    </>
  );
};

export default Contacts;
