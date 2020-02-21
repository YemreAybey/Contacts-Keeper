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

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return { ...state, contacts: action.payload, loading: false };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filter: null,
        current: null,
        error: null,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(c => c._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c._id === action.payload._id ? action.payload : c
        ),
        loading: false,
      };
    case FILTER_CONTACTS:
      return { ...state, filter: action.payload };
    case CLEAR_FILTER:
      return { ...state, filter: null };
    case CONTACT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
