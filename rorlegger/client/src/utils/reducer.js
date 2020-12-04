const theStore = (
  state = {
    loggedInUser: {},
    articles: [],
  },
  action
) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return { ...state, loggedInUser: action.data };
    case 'USER_LOGOUT':
      return { ...state, loggedInUser: '' };
    case 'SAVE_ARTICLES_IN_STORE':
      return { ...state, articles: action.articles };
    default:
      return state;
  }
};

export default theStore;
