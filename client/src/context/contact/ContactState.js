import React, { useReducer } from 'react';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import { config } from '../../api/contactListApi';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filter: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data.contacts });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Clear Contacts
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  //Add-Contact
  const addContact = async contact => {
    try {
      const res = await axios.post('api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data.contact });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Update Contact
  const updateContact = async contact => {
    try {
      const res = await axios.put(
        `api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data.contact });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Set Current Contact
  const setCurrent = contact =>
    dispatch({ type: SET_CURRENT, payload: contact });

  //Clear Current
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

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
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
