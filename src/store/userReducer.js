import { SET_USERS } from './actionsTypes';

const initialState = {
  users: [],
};

const setUsers = (state, users) => {
  return {
    ...state,
    users
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case SET_USERS: return setUsers(state, action.users);
    default: return state;
  }
};

export default reducer;