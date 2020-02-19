import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { name, email, phone, id, type } = contact;
  const handleDelete = () => {
    deleteContact(id);
    clearCurrent();
  };
  const setContact = () => setCurrent(contact);
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'personal' ? 'badge-primary' : 'badge-success')
          }
        >
          {type[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            {' '}
            <i className="fas fa-envelope-open"></i> {email}{' '}
          </li>
        )}

        {phone && (
          <li>
            {' '}
            <i className="fas fa-phone"></i> {phone}{' '}
          </li>
        )}
      </ul>
      <button className="btn btn-dark btn-sm" onClick={setContact}>
        Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
