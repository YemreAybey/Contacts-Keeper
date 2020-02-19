import React, { useReducer } from 'react';
import uuid from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Matt Johnson',
        email: 'matt@gmail.com',
        phone: '222-222-2222',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Mike Tyson',
        email: 'mike@yahoo.com',
        phone: '333-333-3333',
        type: 'professional',
      },
    ],
    current: null,
    filter: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add-Contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delete Contact
  const deleteContact = id => dispatch({ type: DELETE_CONTACT, payload: id });

  //Set Current Contact
  const setCurrent = contact =>
    dispatch({ type: SET_CURRENT, payload: contact });

  //Clear Current
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  //Update Contact
  const updateContact = contact =>
    dispatch({ type: UPDATE_CONTACT, payload: contact });

  //Filter Contacts
  const filterContacts = filter =>
    dispatch({ type: FILTER_CONTACTS, payload: filter });

  //Clear Filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filter: state.filter,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
