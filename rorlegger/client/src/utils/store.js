const store = (
  state = {
    loggedInUser: {},
  },
  action
) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        loggedInUser: action.data,
      };
    case 'USER_LOGOUT':
      return {
        loggedInUser: '',
      };
    case 'REMOVE_USER_DATA':
      return {
        loggedInUser: '',
      };
    default:
      return state;
  }
};

export default store;
