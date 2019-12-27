import { SET_USERS } from './actionsTypes';

export const getUsers = () => {

  return dispatch => {
    fetch('https://yalantis-react-school.herokuapp.com/api/task0/users')
      .then(res => res.json())
      .then(users => dispatch(setUsersStore(users)))
      .catch(err => console.log('[err]', err))
  };
};

const setUsersStore = users => {
  return {
    type: SET_USERS,
    users
  };
};