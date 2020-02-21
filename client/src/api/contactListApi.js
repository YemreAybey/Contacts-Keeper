import axios from 'axios';

export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
