import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map(a => {
      return (
        <div key={a.id} className={`alert alert-${a.type}`}>
          <i className="fas fa-info-circle"></i> {a.msg}
        </div>
      );
    })
  );
};

export default Alert;
